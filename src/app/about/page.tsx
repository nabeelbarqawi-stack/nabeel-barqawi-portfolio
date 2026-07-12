import ImageFrame from "@/components/ImageFrame";
import { JOURNEY, VALUES } from "@/data/content";

export const metadata = { title: "About — Nabeel Barqawi" };

export default function AboutPage() {
  return (
    <div className="page-fade">
      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,4vw,44px) 90px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -100, right: "10%", width: 480, height: 480, background: "radial-gradient(circle, color-mix(in srgb, var(--a1) 28%, transparent), transparent 65%)", filter: "blur(30px)", animation: "floatY 10s ease-in-out infinite" }} />
        <div className="grid-hero-about" style={{ position: "relative", maxWidth: 1160, margin: "0 auto" }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a2)", marginBottom: 16 }}>MY STORY</div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px,4.6vw,58px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.04, marginBottom: 24 }}>I build AI products, and I love watching people grow into their potential.</h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: "#a5a3b8", maxWidth: 540 }}>From product manager to AI leader to educator, my path has been about one thing: turning complex technology into something people can actually use, ship, and learn from.</p>
          </div>
          <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", aspectRatio: "3/4", boxShadow: "0 30px 80px rgba(0,0,0,0.6)", background: "#111119" }}>
            <ImageFrame src="/photos/community-chat.jpg" alt="Nabeel Barqawi connecting at a community event" fit="cover" />
          </div>
        </div>
      </section>

      {/* Journey */}
      <section style={{ background: "var(--paper)", color: "var(--paper-ink)", padding: "110px clamp(20px,4vw,44px)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          {JOURNEY.map((j, i) => (
            <div key={j.era} className="grid-journey" style={{ paddingBottom: 44 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, var(--a1), var(--a2))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: 20, flexShrink: 0 }}>{j.icon}</div>
                {i < JOURNEY.length - 1 && <div style={{ width: 2, flex: 1, background: "linear-gradient(var(--a1), transparent)", marginTop: 8 }} />}
              </div>
              <div style={{ paddingTop: 4 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--a1)", marginBottom: 6 }}>{j.era}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 23, letterSpacing: "-0.015em", marginBottom: 10 }}>{j.title}</h3>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4d4c55" }}>{j.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "var(--ink)", padding: "110px clamp(20px,4vw,44px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a2)", marginBottom: 12 }}>WHAT I BELIEVE</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", color: "#fff", letterSpacing: "-0.025em" }}>The values behind the work</h2>
          </div>
          <div className="grid-3" style={{ marginBottom: 64 }}>
            {VALUES.map((v) => (
              <div key={v.title} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: 30 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "#fff", marginBottom: 12, letterSpacing: "-0.01em" }}>{v.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#a5a3b8" }}>{v.body}</p>
              </div>
            ))}
          </div>
          <div className="grid-values-photos">
            {[
              { id: "about-g1", src: "/photos/stage-wide.jpg", alt: "Speaking on stage" },
              { id: "about-g2", src: "/photos/audience-qa.jpg", alt: "Audience Q&A at a workshop" },
              { id: "about-g3", src: "/photos/portrait-laptop.jpg", alt: "Presenting a live session" },
            ].map((g) => (
              <div key={g.id} style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "1", border: "1px solid rgba(255,255,255,0.1)", background: "#111119" }}>
                <ImageFrame src={g.src} alt={g.alt} fit="cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
