import { client } from "./client";

// Sanity ist seit der CMS-Entkopplung nur noch die Gutschein-Datenbank.
// Website-Inhalte stehen im Code (JSX mit data-edit-id) und werden über das
// Pixelheld-Portal gepflegt. Die alten Content-Dokumente liegen weiter im
// Sanity-Projekt und als Snapshot unter content-backup/.

// ─── Types ───────────────────────────────────────────────────────────────────

export type SanityVoucherProductType =
  | "block_5_30"
  | "block_5_45"
  | "block_5_60"
  | "block_10_30"
  | "block_10_45"
  | "block_10_60"
  | "voucher_custom";

export type SanityVoucherStatus =
  | "paid"
  | "partially_redeemed"
  | "fully_redeemed"
  | "expired"
  | "cancelled"
  | "paid_pdf_failed"
  | "paid_email_failed";

export type SanityVoucher = {
  _id: string;
  code: string;
  stripeSessionId: string;
  stripePaymentIntentId: string | null;
  productType: SanityVoucherProductType;
  sessionsTotal: number | null;
  sessionsRemaining: number | null;
  durationMin: number | null;
  customAmount: number | null;
  customAmountRemaining: number | null;
  buyerEmail: string;
  buyerName: string | null;
  recipientName: string | null;
  status: SanityVoucherStatus;
  redemptions: Array<{
    _key: string;
    date: string;
    sessionsRedeemed?: number;
    amountRedeemed?: number;
    note?: string;
  }> | null;
  purchasedAt: string;
  expiresAt: string;
  pdfAsset: {
    asset: { _ref: string; url: string };
  } | null;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Ohne konfiguriertes Sanity (z. B. Pixelheld-Sandbox ohne Secrets) liefert jede Abfrage null.
async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client
      .withConfig({ useCdn: false, token: process.env.SANITY_API_READ_TOKEN })
      .fetch<T>(query, params, { cache: "no-store" });
  } catch {
    return null;
  }
}

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getVoucherByStripeSession(sessionId: string): Promise<SanityVoucher | null> {
  return safeFetch<SanityVoucher>(
    `*[_type == "voucher" && stripeSessionId == $sessionId][0] {
      _id, code, stripeSessionId, stripePaymentIntentId, productType,
      sessionsTotal, sessionsRemaining, durationMin,
      customAmount, customAmountRemaining,
      buyerEmail, buyerName, recipientName, status,
      redemptions[] { _key, date, sessionsRedeemed, amountRedeemed, note },
      purchasedAt, expiresAt,
      pdfAsset { asset->{ _ref, url } }
    }`,
    { sessionId }
  );
}
