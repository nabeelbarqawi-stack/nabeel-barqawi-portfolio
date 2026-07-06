import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProgram } from "@/lib/programs";
import { getOpenCohort, supabaseAdmin } from "@/lib/supabase-admin";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { slug, name, email, message } = body as {
    slug?: string;
    name?: string;
    email?: string;
    message?: string;
  };

  const program = slug ? getProgram(slug) : undefined;
  if (!program || program.paymentMethod !== "stripe" || !program.priceCents) {
    return NextResponse.json({ error: "Unknown or non-payable program" }, { status: 400 });
  }
  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  let cohortId: string | null = null;
  if (program.capacityTracked) {
    const cohort = await getOpenCohort(program.slug);
    if (!cohort || cohort.seats_taken >= cohort.capacity) {
      return NextResponse.json({ error: "This program is currently full" }, { status: 409 });
    }
    cohortId = cohort.id;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: program.currency,
            unit_amount: program.priceCents,
            product_data: { name: program.name },
          },
          quantity: 1,
        },
      ],
      success_url: `${SITE_URL}/programs/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/programs/cancelled`,
    });

    if (!session.url) {
      throw new Error("Stripe session created without a URL");
    }

    const { error } = await supabaseAdmin.from("signups").insert({
      program_slug: program.slug,
      cohort_id: cohortId,
      name,
      email,
      message: message || null,
      stripe_checkout_session_id: session.id,
      status: "pending",
      amount_cents: program.priceCents,
      currency: program.currency,
    });

    if (error) {
      console.error("[checkout/create-session] failed to insert signup row", error);
      // Don't block the user — the webhook can self-heal by upserting on session id.
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout/create-session] failed", err);
    return NextResponse.json({ error: "Failed to start checkout" }, { status: 502 });
  }
}
