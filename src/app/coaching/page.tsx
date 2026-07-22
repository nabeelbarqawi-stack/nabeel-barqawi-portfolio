import CalBookingButton from "@/components/CalBookingButton";
import Testimonial from "@/components/Testimonial";
import { COACHING_FOR, CURRICULUM, COACHING_TESTIMONIALS, FAQS } from "@/data/content";

export const metadata = { title: "Coaching — Nabeel Barqawi" };

export default function CoachingPage() {
  return (
    <div className="page-fade">
      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,4vw,44px) 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(circle, color-mix(in srgb, var(--a1) 22%, transparent), transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a2)", marginBottom: 16 }}>COACHING</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px,4.6vw,58px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.04, marginBottom: 22 }}>Grow into the product leader you&apos;re becoming.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#a5a3b8", marginBottom: 34 }}>1:1 coaching for PMs and aspiring AI product leaders, a structured, human partnership focused on real outcomes.</p>
          <CalBookingButton className="btn-primary" style={{ padding: "15px 30px", borderRadius: 12, fontSize: 15 }}>Book a coaching call →</CalBookingButton>
        </div>
      </section>

      <section style={{ background: "var(--paper)", color: "var(--paper-ink)", padding: "100px clamp(20px,4vw,44px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="grid-2" style={{ marginBottom: 80 }}>
            <div style={{ background: "#fff", border: "1px solid #E7E5E0", borderRadius: 20, padding: 36 }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.015em", marginBottom: 18 }}>Who it&apos;s for</h3>
              {COACHING_FOR.map((c) => (
                <div key={c} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ color: "var(--a2)", fontWeight: 700, marginTop: 1 }}>✓</div>
                  <div style={{ fontSize: 15, lineHeight: 1.5, color: "#3a3941" }}>{c}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--ink)", borderRadius: 20, padding: 36, color: "#fff" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.015em", marginBottom: 18 }}>The curriculum</h3>
              {CURRICULUM.map((c) => (
                <div key={c.n} style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--a2)", fontSize: 14 }}>{c.n}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>{c.title}</div>
                    <div style={{ fontSize: 13.5, color: "#a5a3b8", marginTop: 2 }}>{c.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px,3vw,36px)", letterSpacing: "-0.02em", marginBottom: 28, textAlign: "center" }}>Success stories</h2>
          <div className="grid-2" style={{ marginBottom: 80 }}>
            {COACHING_TESTIMONIALS.map((q) => (
              <Testimonial key={q.name} {...q} light />
            ))}
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px,3vw,36px)", letterSpacing: "-0.02em", marginBottom: 28, textAlign: "center" }}>FAQs</h2>
          <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gap: 12 }}>
            {FAQS.map((f) => (
              <div key={f.q} style={{ background: "#fff", border: "1px solid #E7E5E0", borderRadius: 14, padding: "24px 28px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, marginBottom: 8, letterSpacing: "-0.01em" }}>{f.q}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#4d4c55" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
