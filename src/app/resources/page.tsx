import NewsletterForm from "@/components/NewsletterForm";
import { RESOURCE_FILTERS, RESOURCES } from "@/data/content";

export const metadata = { title: "Resources — Nabeel Barqawi" };

export default function ResourcesPage() {
  return (
    <div className="page-fade">
      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,4vw,44px) 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(circle, color-mix(in srgb, var(--a1) 20%, transparent), transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a2)", marginBottom: 16 }}>RESOURCE HUB</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px,4.6vw,58px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.04, marginBottom: 22 }}>Everything I&apos;ve learned, free to use.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#a5a3b8" }}>Articles, tutorials, guides, templates, and downloads on AI and product management.</p>
        </div>
      </section>

      {/* Filters + grid */}
      <section style={{ background: "var(--paper)", color: "var(--paper-ink)", padding: "70px clamp(20px,4vw,44px) 110px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 44, justifyContent: "center" }}>
            {RESOURCE_FILTERS.map((f) => (
              <div key={f} style={{ padding: "10px 20px", borderRadius: 100, background: "#fff", border: "1px solid #E7E5E0", fontWeight: 600, fontSize: 13.5, color: "#4d4c55" }}>{f}</div>
            ))}
          </div>
          <div className="grid-3">
            {RESOURCES.map((r) => (
              <div key={r.title} className="card-content">
                <div style={{ aspectRatio: "16/10", background: "linear-gradient(135deg,#151521,#0B0B12)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(color-mix(in srgb, var(--a1) 12%, transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb, var(--a1) 12%, transparent) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, color: "var(--a2)", position: "relative", padding: "6px 14px", border: "1px solid color-mix(in srgb, var(--a2) 30%, transparent)", borderRadius: 100 }}>{r.type}</div>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--a1)", marginBottom: 8 }}>{r.cat}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em", lineHeight: 1.25, marginBottom: 8 }}>{r.title}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "#6B6A73" }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter band */}
      <section style={{ background: "var(--ink)", padding: "0 clamp(20px,4vw,44px) 110px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", background: "linear-gradient(135deg, color-mix(in srgb, var(--a1) 16%, transparent), color-mix(in srgb, var(--a2) 8%, transparent))", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "clamp(32px,5vw,52px)", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px,3.2vw,38px)", color: "#fff", letterSpacing: "-0.02em", marginBottom: 12 }}>Get new resources first</h2>
          <p style={{ fontSize: 16, color: "#a5a3b8", maxWidth: 460, margin: "0 auto 28px" }}>New templates, guides, and tutorials land in the newsletter before anywhere else.</p>
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <NewsletterForm buttonText="Keep me updated →" source="Resources signup" center minInputWidth={230} successText="You're on the list, thank you!" darkInput />
          </div>
        </div>
      </section>
    </div>
  );
}
