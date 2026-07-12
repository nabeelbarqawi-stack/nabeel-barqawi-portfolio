import ContactCards from "@/components/ContactCards";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata = { title: "Contact — Nabeel Barqawi" };

export default function ContactPage() {
  return (
    <div className="page-fade">
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,4vw,44px) 110px", position: "relative", overflow: "hidden", minHeight: "80vh" }}>
        <div aria-hidden style={{ position: "absolute", top: "10%", right: "10%", width: 500, height: 500, background: "radial-gradient(circle, color-mix(in srgb, var(--a1) 25%, transparent), transparent 65%)", filter: "blur(40px)", animation: "floatY 10s ease-in-out infinite" }} />
        <div aria-hidden style={{ position: "absolute", bottom: 0, left: "5%", width: 420, height: 420, background: "radial-gradient(circle, color-mix(in srgb, var(--a2) 18%, transparent), transparent 65%)", filter: "blur(40px)" }} />
        <div style={{ position: "relative", maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a2)", marginBottom: 16 }}>LET&apos;S CONNECT</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(38px,5vw,62px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.03, marginBottom: 20 }}>This is an invitation.</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#a5a3b8", maxWidth: 560, margin: "0 auto" }}>Whether you want to work together, learn together, or build something, I&apos;d love to hear from you. Pick the door that fits.</p>
          </div>

          <ContactCards />

          <div className="grid-contact-news" style={{ marginTop: 24, background: "linear-gradient(135deg, color-mix(in srgb, var(--a1) 14%, transparent), color-mix(in srgb, var(--a2) 8%, transparent))", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 36 }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, color: "#fff", letterSpacing: "-0.015em", marginBottom: 6 }}>Get the newsletter</h3>
              <p style={{ fontSize: 14.5, color: "#a5a3b8" }}>AI + product insights, resources, and event invites. No spam, ever.</p>
            </div>
            <NewsletterForm buttonText="Subscribe" source="Contact newsletter" minInputWidth={220} successText="Subscribed, thank you!" darkInput />
          </div>
        </div>
      </section>
    </div>
  );
}
