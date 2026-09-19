import "server-only";
import Stripe from "stripe";

// Lazy: Der Client entsteht erst beim ersten Zugriff. So bricht `next build`
// nicht ab, wenn STRIPE_SECRET_KEY fehlt — z. B. in der Pixelheld-Editor-Sandbox,
// die bewusst ohne Zahlungs-Secrets läuft. Ein echter Checkout ohne Key
// scheitert weiterhin laut, nur eben erst zur Laufzeit.
let instance: Stripe | null = null;

function getStripe(): Stripe {
  if (instance) return instance;
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set");
  }
  instance = new Stripe(secret, {
    apiVersion: "2026-04-22.dahlia",
    typescript: true,
  });
  return instance;
}

export const stripe: Stripe = new Proxy({} as Stripe, {
  get: (_target, prop) => Reflect.get(getStripe(), prop),
});
