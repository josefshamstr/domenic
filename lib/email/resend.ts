import "server-only";
import { Resend } from "resend";

// Lazy aus demselben Grund wie lib/stripe/client.ts: Build ohne Secrets muss durchlaufen.
let instance: Resend | null = null;

function getResend(): Resend {
  if (instance) return instance;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }
  instance = new Resend(key);
  return instance;
}

export const resend: Resend = new Proxy({} as Resend, {
  get: (_target, prop) => Reflect.get(getResend(), prop),
});

export const EMAIL_FROM = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
