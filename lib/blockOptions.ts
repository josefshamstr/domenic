export type Duration = 30 | 45 | 60;
export type Size = 5 | 10;

export type BlockProductKey =
  | "block_5_30"
  | "block_5_45"
  | "block_5_60"
  | "block_10_30"
  | "block_10_45"
  | "block_10_60";

export type BlockOption = {
  size: Size;
  duration: Duration;
  price: number;
  fullPrice: number;
  productKey: BlockProductKey;
};

// Struktur jeder Blockkarte: size + duration → productKey.
// Die Preise stehen in BLOCK_PRICES unten und sind die einzige Quelle für
// Gutschein-Seite, Preisseite UND Stripe-Checkout. Preisänderung = diese Tabelle ändern.
const BLOCK_STRUCTURE: readonly {
  size: Size;
  duration: Duration;
  productKey: BlockProductKey;
}[] = [
  { size: 5, duration: 30, productKey: "block_5_30" },
  { size: 5, duration: 45, productKey: "block_5_45" },
  { size: 5, duration: 60, productKey: "block_5_60" },
  { size: 10, duration: 30, productKey: "block_10_30" },
  { size: 10, duration: 45, productKey: "block_10_45" },
  { size: 10, duration: 60, productKey: "block_10_60" },
] as const;

export const BLOCK_PRICES: Record<
  BlockProductKey,
  { price: number; fullPrice: number }
> = {
  block_5_30: { price: 259, fullPrice: 275 },
  block_5_45: { price: 329, fullPrice: 350 },
  block_5_60: { price: 399, fullPrice: 425 },
  block_10_30: { price: 489, fullPrice: 550 },
  block_10_45: { price: 619, fullPrice: 700 },
  block_10_60: { price: 749, fullPrice: 850 },
};

export const DURATIONS: readonly Duration[] = [30, 45, 60] as const;
export const SIZES: readonly Size[] = [5, 10] as const;

export function getBlockOption(
  size: Size,
  duration: Duration,
): BlockOption {
  const found = BLOCK_STRUCTURE.find(
    (o) => o.size === size && o.duration === duration,
  );
  if (!found) {
    throw new Error(`No block option for size=${size}, duration=${duration}`);
  }
  const { price, fullPrice } = BLOCK_PRICES[found.productKey];
  return { size, duration, productKey: found.productKey, price, fullPrice };
}

export function getBlockPriceCents(productKey: BlockProductKey): number {
  // Math.round schützt gegen Float-Artefakte (z.B. 259.45 * 100 = 25945.0000000000004),
  // die Stripes unit_amount-Integer-Validation auslösen würden.
  return Math.round(BLOCK_PRICES[productKey].price * 100);
}

export function discountPercent(price: number, fullPrice: number): number {
  return Math.round(((fullPrice - price) / fullPrice) * 100);
}
