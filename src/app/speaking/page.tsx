import Link from "next/link";
import ImageFrame from "@/components/ImageFrame";
import { TOPICS, TALKS } from "@/data/content";

export const metadata = { title: "Speaking — Nabeel Barqawi" };

export default function SpeakingPage() {
  return (
    <div className="page-fade">
      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,4vw,44px) 90px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", bottom: -120, left: "20%", width: 500, height: 400, background: "radial-gradient(circle, color-mix(in srgb, var(--a2) 20%, transparent), transparent 70%)", filter: "blur(40px)" }} />
        <div className="grid-hero-even" style={{ position: "relative", maxWidth: 1160, margin: "0 auto" }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a2)", marginBottom: 16 }}>SPEAKING</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px,4.6vw,56px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.04, marginBottom: 22 }}>Talks that leave rooms excited about the future.</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#a5a3b8", marginBottom: 32 }}>Keynotes and workshops on AI, product, and the future of work, practical, energizing, and built for your audience.</p>
            <Link href="/contact" className="btn-primary" style={{ padding: "15px 28px", borderRadius: 12, fontSize: 15, boxShadow: "none" }}>Book me to speak →</Link>
          </div>
          <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "4/3", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 30px 80px rgba(0,0,0,0.6)", background: "#111119" }}>
            <ImageFrame src="/photos/portrait-laptop.jpg" alt="Nabeel Barqawi on stage" fit="cover" />
          </div>
        </div>
      </section>

      {/* Topics + talks */}
      <section style={{ background: "var(--paper)", color: "var(--paper-ink)", padding: "100px clamp(20px,4vw,44px) 60px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px,3vw,36px)", letterSpacing: "-0.02em", marginBottom: 28 }}>Topics I speak about</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 80 }}>
            {TOPICS.map((t) => (
              <div key={t} style={{ padding: "12px 20px", borderRadius: 100, background: "#fff", border: "1px solid #E7E5E0", fontWeight: 600, fontSize: 14.5, color: "var(--paper-ink)" }}>{t}</div>
            ))}
          </div>

          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(26px,3vw,36px)", letterSpacing: "-0.02em", marginBottom: 28 }}>Past &amp; upcoming</h2>
          <div style={{ display: "grid", gap: 14 }}>
            {TALKS.map((t) => (
              <div key={t.title} className="talk-row" style={{ background: "#fff", border: "1px solid #E7E5E0", borderRadius: 16, padding: "24px 28px" }}>
                <div className="talk-main">
                  <div style={{ fontSize: 12, fontWeight: 700, padding: "5px 12px", borderRadius: 100, color: t.accent ? "#0B0B12" : "var(--a1)", background: t.accent ? "var(--a2)" : "color-mix(in srgb, var(--a1) 14%, transparent)" }}>{t.tag}</div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>{t.title}</h3>
                    <div style={{ fontSize: 13.5, color: "#6B6A73", marginTop: 3 }}>{t.event}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#6B6A73" }}>{t.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
