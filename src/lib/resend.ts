import { Resend } from "resend";
import type { Program } from "./programs";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export const resend = new Resend(RESEND_API_KEY);

export async function sendLeadReceivedEmail(params: { to: string; name: string; program: Program }) {
  const { to, name, program } = params;

  try {
    const { error } = await resend.emails.send({
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
