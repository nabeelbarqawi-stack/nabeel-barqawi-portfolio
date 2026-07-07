import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { leadId, programSlug, cohortId, clientName, clientEmail, description, amountCents } = body as {
    leadId?: string;
    programSlug?: string;
    cohortId?: string;
    clientName?: string;
    clientEmail?: string;
    description?: string;
    amountCents?: number;
  };

  if (!clientName || !clientEmail || !description || !amountCents || amountCents <= 0) {
    return NextResponse.json({ error: "Client name, email, description, and a positive amount are required" }, { status: 400 });
  }

  try {
    const existing = await stripe.customers.list({ email: clientEmail, limit: 1 });
    const customer =
      existing.data[0] ?? (await stripe.customers.create({ email: clientEmail, name: clientName }));

    const draft = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: 7,
    });

    // Invoice items must reference the invoice directly — they are not
    // auto-attached as "pending" items when the invoice is created.
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: draft.id,
      amount: amountCents,
      currency: "usd",
      description,
    });

    const finalized = await stripe.invoices.finalizeInvoice(draft.id!);
    const sent = await stripe.invoices.sendInvoice(finalized.id!);

    const { error } = await supabaseAdmin.from("invoices").insert({
      lead_id: leadId || null,
      program_slug: programSlug || null,
      cohort_id: cohortId || null,
      client_name: clientName,
      client_email: clientEmail,
      description,
      amount_cents: amountCents,
      stripe_customer_id: customer.id,
      stripe_invoice_id: sent.id,
      hosted_invoice_url: sent.hosted_invoice_url,
      status: "open",
    });

    if (error) throw error;

    return NextResponse.json({ ok: true, hostedInvoiceUrl: sent.hosted_invoice_url });
  } catch (err) {
    console.error("[invoices/create] failed", err);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 502 });
  }
}
