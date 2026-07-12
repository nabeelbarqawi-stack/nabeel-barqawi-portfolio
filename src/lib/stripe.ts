import Stripe from "stripe";

// Lazily constructed so `next build` succeeds without STRIPE_SECRET_KEY;
// the key is only required when a Stripe route actually runs.
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) client = new Stripe(process.env.STRIPE_SECRET_KEY!);
  return client;
}
