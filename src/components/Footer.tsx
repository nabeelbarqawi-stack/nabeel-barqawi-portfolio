import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { FOOTER_NAV, CONTACT } from "@/data/content";

export default function Footer() {
  return (
    <footer style={{ background: "var(--ink-2)", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "56px clamp(20px,4vw,44px) 40px" }}>
      {/* Stay in the loop */}
      <div className="grid-footer-top" style={{ maxWidth: 1160, margin: "0 auto 44px", paddingBottom: 44, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(20px,2.4vw,26px)", color: "#fff", letterSpacing: "-0.015em", marginBottom: 6 }}>Stay in the loop</div>
          <div style={{ fontSize: 14.5, color: "#8f8da5", maxWidth: 440 }}>Join the builders getting AI + product insights, free resources, and event invites, straight to your inbox.</div>
        </div>
        <NewsletterForm buttonText="Subscribe" source="Footer newsletter" minInputWidth={240} successText="Thanks, you're subscribed!" />
      </div>

      <div className="grid-footer" style={{ maxWidth: 1160, margin: "0 auto", paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontFamily: "var(--font-wordmark)", fontWeight: 400, fontSize: 24, background: "linear-gradient(135deg, var(--a2), var(--a1))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", filter: "drop-shadow(0 0 12px color-mix(in srgb, var(--a2) 40%, transparent))" }}>
              Nabeel Barqawi
            </span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "#7d7b93", maxWidth: 320 }}>
            Product leader, AI builder, and educator helping people learn, build, connect, and create meaningful impact.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#6b6980", marginBottom: 16 }}>EXPLORE</div>
          <div style={{ display: "grid", gap: 10 }}>
            {FOOTER_NAV.map((f) => (
              <Link key={f.href} href={f.href} className="link-muted" style={{ fontSize: 14 }}>{f.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "#6b6980", marginBottom: 16 }}>CONNECT</div>
          <div style={{ display: "grid", gap: 10 }}>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="link-muted" style={{ fontSize: 14 }}>LinkedIn</a>
            <Link href="/contact" className="link-muted" style={{ fontSize: 14 }}>Newsletter</Link>
            <a href={`mailto:${CONTACT.email}`} className="link-muted" style={{ fontSize: 14 }}>Email</a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: "24px auto 0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ fontSize: 13, color: "#5a5870" }}>© 2026 Nabeel Barqawi. Building the future, together.</div>
      </div>
    </footer>
  );
}
