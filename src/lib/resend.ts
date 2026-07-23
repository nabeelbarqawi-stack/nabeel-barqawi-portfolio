import { Resend } from "resend";
import type { Program } from "./programs";

const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
// Where form-submission / payment alerts are sent. With the sandbox sender
// (onboarding@resend.dev) Resend only delivers to your own Resend-account email.
const ADMIN_EMAIL = "nabeelbarqawi@gmail.com";

// Lazily constructed so `next build` succeeds without RESEND_API_KEY.
let client: Resend | null = null;

function getResend(): Resend {
  if (!client) client = new Resend(process.env.RESEND_API_KEY!);
  return client;
}

export async function sendLeadReceivedEmail(params: { to: string; name: string; program: Program }) {
  const { to, name, program } = params;

  try {
    const { error } = await getResend().emails.send({
      from: `Nabeel Barqawi <${RESEND_FROM_EMAIL}>`,
      to,
      subject: `Got your request: ${program.name}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; color: #0E0E12;">
          <p>Hi ${name},</p>
          <p>Thanks for reaching out about <strong>${program.name}</strong> — ${program.tagline}</p>
          <p>I'll follow up shortly, and if it's a fit, I'll send over an invoice with next steps.</p>
          <p>— Nabeel</p>
        </div>
      `,
    });
    // The Resend SDK returns { error } on API-level failures (e.g. sandbox
    // restrictions) rather than throwing — must check it explicitly or
    // failures pass by silently.
    if (error) {
      console.error("[resend] sendLeadReceivedEmail rejected", error);
    }
  } catch (err) {
    console.error("[resend] sendLeadReceivedEmail failed", err);
  }
}

/**
 * Notifies you (ADMIN_EMAIL) about a new form submission or payment. Best-effort:
 * logs and swallows failures so it never breaks the request.
 */
export async function sendAdminAlert(params: {
  subject: string;
  source?: string;
  name?: string;
  email?: string;
  message?: string;
}) {
  const { subject, source, name, email, message } = params;
  try {
    const rows = [
      source && `<p style="margin:4px 0"><strong>Source:</strong> ${source}</p>`,
      name && `<p style="margin:4px 0"><strong>Name:</strong> ${name}</p>`,
      email && `<p style="margin:4px 0"><strong>Email:</strong> ${email}</p>`,
      message && `<p style="margin:12px 0 0"><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
    ]
      .filter(Boolean)
      .join("");

    const { error } = await getResend().emails.send({
      from: `Portfolio <${RESEND_FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      replyTo: email || undefined,
      subject,
      html: `<div style="font-family:-apple-system,sans-serif;max-width:520px;color:#0E0E12">${rows || "<p>New submission.</p>"}</div>`,
    });
    if (error) console.error("[resend] sendAdminAlert rejected", error);
  } catch (err) {
    console.error("[resend] sendAdminAlert failed", err);
  }
}
