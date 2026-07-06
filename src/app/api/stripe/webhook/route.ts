import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
const FORMSPREE_FORM_ID = "xqewjded"; // same form Contact.tsx uses

async function notifyFormspree(payload: Record<string, string>) {
  try {
    await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error("[stripe/webhook] formspree notify failed", err);
  }
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    if (!signature) throw new Error("Missing stripe-signature header");
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe/webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  try {
    const { data: signup, error: fetchError } = await supabaseAdmin
      .from("signups")
      .select("*")
      .eq("stripe_checkout_session_id", session.id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!signup) {
      console.error("[stripe/webhook] no signup row found for session", session.id);
      return NextResponse.json({ received: true });
    }

    if (signup.status === "paid") {
      // Already processed — Stripe retries webhooks, this keeps it idempotent.
      return NextResponse.json({ received: true });
    }

    const { error: updateError } = await supabaseAdmin
      .from("signups")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
        stripe_payment_intent_id:
          typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null,
      })
      .eq("id", signup.id);

    if (updateError) throw updateError;

    if (signup.cohort_id) {
      const { error: rpcError } = await supabaseAdmin.rpc("increment_cohort_seat", {
        p_cohort_id: signup.cohort_id,
      });
      if (rpcError) {
        console.error("[stripe/webhook] increment_cohort_seat failed", rpcError);
      }
    }

    await notifyFormspree({
      name: signup.name,
      email: signup.email,
      message: `New paid signup — ${signup.program_slug} — $${(signup.amount_cents / 100).toFixed(2)}${
        signup.message ? `\n\nNote from client: ${signup.message}` : ""
      }`,
      _subject: `New signup: ${signup.program_slug}`,
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[stripe/webhook] processing failed", err);
    // Return 500 so Stripe retries — this path is a DB/infra failure, not a bad event.
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
