import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { notifyFormspree } from "@/lib/formspree";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email-only newsletter / signup boxes. Stored in contact_messages (the admin
// "Database") with the form's source as the intent, and no name/message.
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email, source } = body as { email?: string; source?: string };

  const cleanEmail = email?.trim();
  if (!cleanEmail || !EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  const intent = source?.trim() || "Newsletter";

  try {
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: "—",
      email: cleanEmail,
      intent,
      message: null,
    });
    if (error) throw error;

    // Best-effort email alert (same channel as the other forms).
    await notifyFormspree({
      email: cleanEmail,
      form_type: intent,
      _subject: `New signup: ${intent}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] failed", err);
    return NextResponse.json({ error: "Failed to subscribe — please try again" }, { status: 500 });
  }
}
