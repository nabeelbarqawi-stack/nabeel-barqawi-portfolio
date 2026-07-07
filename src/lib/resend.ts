import { Resend } from "resend";
import type { Program } from "./programs";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export const resend = new Resend(RESEND_API_KEY);

export async function sendSignupConfirmationEmail(params: {
  to: string;
  name: string;
  program: Program;
  amountCents: number;
}) {
  const { to, name, program, amountCents } = params;
  const amount = (amountCents / 100).toFixed(2);

  try {
    await resend.emails.send({
      from: `Nabeel Barqawi <${RESEND_FROM_EMAIL}>`,
      to,
      subject: `You're confirmed: ${program.name}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; color: #0E0E12;">
          <p>Hi ${name},</p>
          <p>You're confirmed for <strong>${program.name}</strong> — $${amount} charged. ${program.tagline}</p>
          <p>I'll follow up shortly with next steps.</p>
          <p>— Nabeel</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[resend] sendSignupConfirmationEmail failed", err);
  }
}
