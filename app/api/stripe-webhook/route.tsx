import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import type Stripe from "stripe";
import { createClient } from "next-sanity";
import { stripe } from "@/lib/stripe/client";
import {
  PRODUCT_DEFINITIONS,
  PRODUCT_PRICES_EUR,
  productTypeFromStripeMetadata,
} from "@/lib/stripe/products";
import { generateUniqueVoucherCode } from "@/lib/voucher/generateCode";
import { expiryFromNow } from "@/lib/voucher/expiry";
import { sendVoucherConfirmation } from "@/lib/email/sendVoucherConfirmation";
import { sendDomenicNotification } from "@/lib/email/sendDomenicNotification";
import { CONTACT_EMAIL } from "@/lib/site";
import { VoucherPDF } from "@/components/VoucherPDF";
import type { SanityVoucher, SanityVoucherProductType } from "@/sanity/lib/queries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Server-side write client: useCdn false, Editor-permission token required.
// SANITY_API_WRITE_TOKEN must be created at sanity.io/manage/project/<id>/api/tokens
// with "Editor" permission (NOT "Read") — needed for create/upload/patch operations
// when persisting voucher documents and uploading PDF assets.
const writeClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_API_WRITE_TOKEN,
    })
  : null;

function valueFromProductType(
  productType: SanityVoucherProductType,
  amountTotalCents: number | null,
): {
  sessionsTotal: number | null;
  sessionsRemaining: number | null;
  durationMin: number | null;
  customAmount: number | null;
  customAmountRemaining: number | null;
} {
  const def = PRODUCT_DEFINITIONS[productType];
  if (def.kind === "block") {
    return {
      sessionsTotal: def.sessionsTotal,
      sessionsRemaining: def.sessionsTotal,
      durationMin: def.durationMin,
      customAmount: null,
      customAmountRemaining: null,
    };
  }
  // custom
  const amount = amountTotalCents ? Math.round(amountTotalCents / 100) : 0;
  return {
    sessionsTotal: null,
    sessionsRemaining: null,
    durationMin: null,
    customAmount: amount,
    customAmountRemaining: amount,
  };
}

export async function POST(req: Request) {
  if (!WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }
  if (!writeClient) {
    console.error("Sanity client not configured");
    return NextResponse.json({ error: "Sanity not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const sessionId = session.id;

  // Idempotency check
  try {
    const existing = await writeClient.fetch<{ _id: string } | null>(
      `*[_type == "voucher" && stripeSessionId == $sessionId][0] { _id }`,
      { sessionId }
    );
    if (existing) {
      console.log(`Voucher already exists for session ${sessionId}, skipping`);
      return NextResponse.json({ received: true, idempotent: true });
    }
  } catch (err) {
    console.error("Idempotency check failed:", err);
    return NextResponse.json({ error: "Sanity check failed" }, { status: 500 });
  }

  const productType = productTypeFromStripeMetadata(session.metadata);
  if (!productType) {
    console.error(`Invalid productType in session metadata: ${sessionId}`);
    return NextResponse.json({ error: "Invalid productType" }, { status: 400 });
  }

  // Defense in depth: for block products, verify Stripe-charged amount matches the
  // expected price that /api/checkout recorded when creating the session. This is
  // resilient to Sanity-driven price changes — checkout writes the price-at-session-
  // creation-time into session.metadata.expectedAmountCents, webhook validates against
  // exactly that. Falls back to the legacy hardcoded PRODUCT_PRICES_EUR lookup if
  // metadata isn't present (e.g., sessions created before this defense was added).
  if (PRODUCT_DEFINITIONS[productType].kind === "block") {
    const metadataExpected = session.metadata?.expectedAmountCents;
    const expectedCents =
      metadataExpected != null && /^\d+$/.test(metadataExpected)
        ? Number(metadataExpected)
        : (PRODUCT_PRICES_EUR[productType] ?? 0) * 100;
    if (session.amount_total !== expectedCents) {
      console.error(
        `Price mismatch for ${productType}: expected ${expectedCents}, got ${session.amount_total}. Session ${sessionId}`
      );
      const mismatchVoucher = {
        code: `MISMATCH-${sessionId.slice(-8)}`,
        productType,
        sessionsTotal: null,
        durationMin: null,
        customAmount: session.amount_total ? session.amount_total / 100 : null,
        buyerEmail: session.customer_details?.email ?? "(unknown)",
        buyerName: "(price mismatch)",
        recipientName: null,
        status: "cancelled" as const,
      };
      // 1) Persist to Sanity FIRST — durable record in Studio "Probleme"-Liste
      //    auch wenn Email-Versand danach fehlschlägt. Customer hat schon gezahlt,
      //    Geld darf nicht in einem console.error verschwinden.
      if (writeClient) {
        try {
          await writeClient.create({
            _type: "voucher",
            ...mismatchVoucher,
            stripeSessionId: sessionId,
            stripePaymentIntentId:
              typeof session.payment_intent === "string"
                ? session.payment_intent
                : null,
            purchasedAt: new Date().toISOString(),
            expiresAt: null,
          });
        } catch (persistErr) {
          console.error("Failed to persist price-mismatch record:", persistErr);
        }
      }
      // 2) Best-effort alert to Domenic
      try {
        const domenicEmail = CONTACT_EMAIL;
        await sendDomenicNotification({
          voucher: mismatchVoucher,
          domenicEmail,
          isAlert: true,
        });
      } catch (alertErr) {
        console.error("Price-mismatch alert failed:", alertErr);
      }
      return NextResponse.json({ received: true, error: "Price mismatch" }, { status: 200 });
    }
  }

  const buyerEmail =
    session.customer_details?.email ?? session.customer_email ?? "";
  const buyerName = session.metadata?.buyerName ?? "";
  const recipientName = session.metadata?.recipientName || "";

  const value = valueFromProductType(productType, session.amount_total);

  const code = await generateUniqueVoucherCode();
  const purchasedAt = new Date().toISOString();
  const expiresAt = expiryFromNow().toISOString();

  // Create voucher document in Sanity
  let voucherDoc: SanityVoucher;
  try {
    // Sanity .create() returns SanityDocument with extra metadata fields (_createdAt, _rev) that
    // don't strictly satisfy our SanityVoucher type — double-cast bypasses the structural check.
    voucherDoc = (await writeClient.create({
      _type: "voucher",
      code,
      stripeSessionId: sessionId,
      stripePaymentIntentId:
        typeof session.payment_intent === "string" ? session.payment_intent : null,
      productType,
      ...value,
      buyerEmail,
      buyerName: buyerName || null,
      recipientName: recipientName || null,
      status: "paid",
      redemptions: [],
      purchasedAt,
      expiresAt,
    })) as unknown as SanityVoucher;
  } catch (err) {
    console.error("Failed to create voucher document:", err);
    return NextResponse.json({ error: "Sanity create failed" }, { status: 500 });
  }

  const domenicEmail = CONTACT_EMAIL;

  // Render PDF
  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await renderToBuffer(
      <VoucherPDF
        voucher={{
          code: voucherDoc.code,
          productType: voucherDoc.productType,
          sessionsTotal: voucherDoc.sessionsTotal,
          durationMin: voucherDoc.durationMin,
          customAmount: voucherDoc.customAmount,
          buyerName: voucherDoc.buyerName,
          recipientName: voucherDoc.recipientName,
          purchasedAt: voucherDoc.purchasedAt,
          expiresAt: voucherDoc.expiresAt,
          purchasedPriceCents: session.amount_total,
        }}
      />
    );
  } catch (err) {
    console.error("PDF rendering failed:", err);
    await writeClient.patch(voucherDoc._id).set({ status: "paid_pdf_failed" }).commit();
    try {
      await sendDomenicNotification({
        voucher: { ...voucherDoc, status: "paid_pdf_failed" },
        domenicEmail,
        isAlert: true,
      });
    } catch (alertErr) {
      console.error("Domenic alert mail failed:", alertErr);
    }
    return NextResponse.json({ received: true, error: "PDF failed" });
  }

  // Upload PDF to Sanity assets
  try {
    const pdfAsset = await writeClient.assets.upload("file", pdfBuffer, {
      filename: `gutschein-${code}.pdf`,
      contentType: "application/pdf",
    });
    await writeClient
      .patch(voucherDoc._id)
      .set({
        pdfAsset: {
          _type: "file",
          asset: { _ref: pdfAsset._id, _type: "reference" },
        },
      })
      .commit();
  } catch (err) {
    console.error("PDF upload to Sanity failed:", err);
    // Continue — buffer still available for email
  }

  // Send buyer email
  try {
    await sendVoucherConfirmation({ voucher: voucherDoc, pdfBuffer });
  } catch (err) {
    console.error("Buyer email failed:", err);
    await writeClient
      .patch(voucherDoc._id)
      .set({ status: "paid_email_failed" })
      .commit();
    try {
      await sendDomenicNotification({
        voucher: { ...voucherDoc, status: "paid_email_failed" },
        domenicEmail,
        isAlert: true,
      });
    } catch (alertErr) {
      console.error("Domenic alert mail failed:", alertErr);
    }
    return NextResponse.json({ received: true, error: "Email failed" });
  }

  // Send Domenic notification (best-effort)
  try {
    await sendDomenicNotification({ voucher: voucherDoc, domenicEmail });
  } catch (err) {
    console.error("Domenic notification failed:", err);
    // Don't fail the webhook — buyer already got their voucher
  }

  return NextResponse.json({ received: true, voucherCode: code });
}
