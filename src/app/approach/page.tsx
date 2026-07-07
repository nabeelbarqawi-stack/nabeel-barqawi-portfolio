import Link from "next/link";
import Nav from "@/components/Nav";
import Approach from "@/components/Approach";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Approach — Nabeel Barqawi",
  description: "How a session actually goes, what I won't do, and who this is (and isn't) for.",
};

const steps = [
  { t: "You bring the mess", d: "The vague goal, the half-built thing, the decision you keep avoiding. No prep required — half-formed is the normal starting point." },
  { t: "We name the actual problem", d: "Most of the session is spent here. What you think you're stuck on is usually one layer above what's really stuck." },
  { t: "You leave with something to do", d: "Not a framework to admire later — a next action, sized for this week, that you can start on your own." },
];

const notFor = [
  "Looking for a generic AI curriculum you could get from a course",
  "Want someone to agree with the plan you already made",
  "Need a vendor to build the thing, not a coach to think it through with you",
];

export default function ApproachPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Approach />

        <section className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
          <div className="container">
            <Reveal>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> In practice
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="section-title" style={{ marginTop: 32, maxWidth: 900 }}>
                What a session actually looks like.
              </h2>
            </Reveal>

            <div className="pillars-grid" style={{ marginTop: 56 }}>
              {steps.map((s, i) => (
                <Reveal key={s.t} delay={i * 100} y={24}>
                  <div className="pillar">
                    <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--fg-dimmer)", marginBottom: 20 }}>
                      STEP {i + 1}
                    </div>
                    <h3 style={{ fontSize: 20, lineHeight: 1.25, letterSpacing: "-0.015em", fontWeight: 500, marginBottom: 12, fontFamily: "var(--font-display)" }}>
                      {s.t}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-dim)" }}>{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
          <div className="container" style={{ maxWidth: 640 }}>
            <Reveal>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> Honestly
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="section-title" style={{ marginTop: 32 }}>
                This isn&apos;t for everyone, and that&apos;s the point.
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <ul style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 18 }}>
                {notFor.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 14, fontSize: 15, lineHeight: 1.6, color: "var(--fg-dim)" }}>
                    <span style={{ color: "var(--fg-dimmer)", flexShrink: 0 }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={320}>
              <p style={{ marginTop: 40, fontSize: 15, lineHeight: 1.6, color: "var(--fg-dim)" }}>
                If none of that sounds like you, a session probably won&apos;t either. If it does —
              </p>
            </Reveal>
            <Reveal delay={400}>
              <Link href="/programs" className="btn btn--primary" style={{ marginTop: 24, display: "inline-flex" }}>
                See how we&apos;d work together
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 4 }}>
                  <path d="M3 7 H11 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
