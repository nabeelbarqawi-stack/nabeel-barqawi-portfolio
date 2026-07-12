import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { notifyFormspree } from "@/lib/formspree";



export async function POST(request: Request) {
  const stripe = getStripe();
  const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
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

  if (event.type !== "invoice.paid") {
    return NextResponse.json({ received: true });
  }

  const stripeInvoice = event.data.object as Stripe.Invoice;

  try {
    const { data: invoice, error: fetchError } = await supabaseAdmin
      .from("invoices")
      .select("*")
      .eq("stripe_invoice_id", stripeInvoice.id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!invoice) {
      console.error("[stripe/webhook] no invoice row found for stripe invoice", stripeInvoice.id);
      return NextResponse.json({ received: true });
    }

    if (invoice.status === "paid") {
      // Already processed — Stripe retries webhooks, this keeps it idempotent.
      return NextResponse.json({ received: true });
    }

    const { error: updateError } = await supabaseAdmin
      .from("invoices")
      .update({ status: "paid", paid_at: new Date().toISOString() })
      .eq("id", invoice.id);

    if (updateError) throw updateError;

    if (invoice.cohort_id) {
      const { error: rpcError } = await supabaseAdmin.rpc("increment_cohort_seat", {
        p_cohort_id: invoice.cohort_id,
      });
      if (rpcError) {
        console.error("[stripe/webhook] increment_cohort_seat failed", rpcError);
      }
    }

    await notifyFormspree({
      name: invoice.client_name,
      email: invoice.client_email,
      message: `Invoice paid — ${invoice.description} — $${(invoice.amount_cents / 100).toFixed(2)}`,
      _subject: `Invoice paid: ${invoice.client_name}`,
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[stripe/webhook] processing failed", err);
    // Return 500 so Stripe retries — this path is a DB/infra failure, not a bad event.
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}
