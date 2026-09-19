import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import {
  getStripeProductId,
  PRODUCT_DEFINITIONS,
} from "@/lib/stripe/products";
import { getBlockPriceCents } from "@/lib/blockOptions";
import type { BlockProductKey } from "@/lib/blockOptions";
import type { SanityVoucherProductType } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

type CheckoutInput = {
  productType: SanityVoucherProductType;
  customAmount?: number; // in cents, only for voucher_custom
  buyerEmail: string;
  buyerName: string;
  recipientName?: string;
};

function isValidProductType(value: unknown): value is SanityVoucherProductType {
  return typeof value === "string" && value in PRODUCT_DEFINITIONS;
}

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateInput(body: unknown): CheckoutInput | { error: string } {
  if (!body || typeof body !== "object") return { error: "Invalid JSON body" };
  const b = body as Record<string, unknown>;

  if (!isValidProductType(b.productType)) return { error: "Invalid productType" };
  if (!isValidEmail(b.buyerEmail)) return { error: "Invalid buyerEmail" };
  if (typeof b.buyerName !== "string" || b.buyerName.trim().length === 0) {
    return { error: "Invalid buyerName" };
  }
  if (b.recipientName !== undefined && typeof b.recipientName !== "string") {
    return { error: "Invalid recipientName" };
  }

  const def = PRODUCT_DEFINITIONS[b.productType];
  if (def.kind === "custom") {
    if (typeof b.customAmount !== "number" || b.customAmount < 3000 || b.customAmount > 50000) {
      return { error: "customAmount must be between 3000 and 50000 cents for voucher_custom" };
    }
  } else {
    // Block products: customAmount MUST NOT be present (price-tampering protection)
    if (b.customAmount !== undefined) {
      return { error: "customAmount is only allowed for productType=voucher_custom" };
    }
  }

  return {
    productType: b.productType,
    customAmount: def.kind === "custom" ? (b.customAmount as number) : undefined,
    buyerEmail: b.buyerEmail,
    buyerName: b.buyerName.trim(),
    recipientName:
      typeof b.recipientName === "string" && b.recipientName.trim().length > 0
        ? b.recipientName.trim()
        : undefined,
  };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validated = validateInput(body);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const { productType, customAmount, buyerEmail, buyerName, recipientName } = validated;

  try {
    // Inline-Type da Stripe.Checkout.SessionCreateParams.LineItem nicht
    // direkt re-exportiert wird; die zwei möglichen Shapes hier erfasst.
    let lineItem:
      | { price: string; quantity: number }
      | {
          price_data: {
            currency: "eur";
            product?: string;
            product_data?: { name: string };
            unit_amount: number;
          };
          quantity: number;
        };
    // Soll-Betrag in cents — wird als session.metadata.expectedAmountCents
    // an den Webhook weitergereicht, damit dieser nicht gegen hardcoded
    // PRODUCT_PRICES_EUR validieren muss, sondern gegen den exakten Wert
    // den dieser Checkout erwartet hat.
    let expectedAmountCents: number;

    if (customAmount !== undefined) {
      // Einzelgutschein: price_data inline, Betrag kommt vom Selector
      lineItem = {
        price_data: {
          currency: "eur",
          product_data: { name: "Einzelgutschein" },
          unit_amount: customAmount,
        },
        quantity: 1,
      };
      expectedAmountCents = customAmount;
    } else {
      // Block-Karte: Preis aus lib/blockOptions.ts (BLOCK_PRICES), gegen den persistenten Stripe Product
      // gebucht via price_data inline. STRIPE_PRODUCT_BLOCK_* MUSS gesetzt
      // sein — kein silent fallback auf STRIPE_PRICE_BLOCK_* mehr, weil das
      // bei Preisänderungen zu Mismatch zwischen unit_amount und
      // expectedAmountCents führen würde (Webhook lehnt dann jede Zahlung
      // als price tampering ab → Kunde zahlt, kein Voucher).
      const blockProductKey = productType as BlockProductKey;
      const stripeProductId = getStripeProductId(productType);
      if (!stripeProductId) {
        console.error(
          `Missing STRIPE_PRODUCT env var for ${productType} — configure before deploy`,
        );
        return NextResponse.json(
          { error: "Checkout temporarily unavailable" },
          { status: 503 },
        );
      }
      expectedAmountCents = getBlockPriceCents(blockProductKey);
      lineItem = {
        price_data: {
          currency: "eur",
          product: stripeProductId,
          unit_amount: expectedAmountCents,
        },
        quantity: 1,
      };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded_page",
      line_items: [lineItem],
      return_url: `${APP_URL}/gutscheine/danke?session_id={CHECKOUT_SESSION_ID}`,
      customer_email: buyerEmail,
      metadata: {
        productType,
        buyerName,
        recipientName: recipientName ?? "",
        expectedAmountCents: String(expectedAmountCents),
      },
      payment_intent_data: {
        metadata: {
          productType,
          buyerName,
          recipientName: recipientName ?? "",
        },
      },
    });

    if (!session.client_secret) {
      console.error("No client_secret in Stripe session");
      return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("Stripe checkout creation failed:", err);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
  }
}
