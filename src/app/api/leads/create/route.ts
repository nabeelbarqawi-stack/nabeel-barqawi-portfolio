import { NextResponse } from "next/server";
import { getProgram } from "@/lib/programs";
import { getOpenCohort, supabaseAdmin } from "@/lib/supabase-admin";
import { notifyFormspree } from "@/lib/formspree";
import { sendLeadReceivedEmail, sendAdminAlert } from "@/lib/resend";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { slug, name, email, message } = body as {
    slug?: string;
    name?: string;
    email?: string;
    message?: string;
  };

  const program = slug ? getProgram(slug) : undefined;
  if (!program) {
    return NextResponse.json({ error: "Unknown program" }, { status: 400 });
  }
  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  let cohortId: string | null = null;
  if (program.capacityTracked) {
    const cohort = await getOpenCohort(program.slug);
    if (cohort) cohortId = cohort.id;
  }

  try {
    const { error } = await supabaseAdmin.from("leads").insert({
      program_slug: program.slug,
      cohort_id: cohortId,
      name,
      email,
      message: message || null,
    });

    if (error) throw error;

    await notifyFormspree({
      name,
      email,
      message: `New lead — ${program.name}${message ? `\n\nNote from client: ${message}` : ""}`,
      _subject: `New lead: ${program.name}`,
    });

    await sendLeadReceivedEmail({ to: email, name, program });
    await sendAdminAlert({
      subject: `New lead: ${program.name}`,
      source: `Lead — ${program.name}`,
      name,
      email,
      message: message || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads/create] failed", err);
    return NextResponse.json({ error: "Failed to submit — please try again" }, { status: 500 });
  }
}
