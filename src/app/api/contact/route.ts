import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { notifyFormspree } from "@/lib/formspree";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { name, email, message, intent } = body as {
    name?: string;
    email?: string;
    message?: string;
    intent?: string;
  };

  const cleanName = name?.trim();
  const cleanEmail = email?.trim();

  if (!cleanName || !cleanEmail) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  try {
    // Persist first — this is the source of truth. Runs server-side with the
    // service-role key (bypasses RLS); never exposed to the client.
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: cleanName,
      email: cleanEmail,
      intent: intent?.trim() || null,
      message: message?.trim() || null,
    });

    if (error) throw error;

    // Best-effort email notification (mirrors the leads flow). A Formspree
    // failure is logged inside notifyFormspree and must not fail the request,
    // since the submission is already saved.
    await notifyFormspree({
      name: cleanName,
      email: cleanEmail,
      form_type: intent?.trim() || "Contact",
      message: message?.trim() || "(no note)",
      _subject: `New message${intent ? `: ${intent}` : ""} — ${cleanName}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed", err);
    return NextResponse.json({ error: "Failed to submit — please try again" }, { status: 500 });
  }
}
