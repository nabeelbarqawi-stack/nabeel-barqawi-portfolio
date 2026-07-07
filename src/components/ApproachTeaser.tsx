import Link from "next/link";
import Reveal from "./Reveal";

const pillars = [
  { t: "Clarity over noise", d: "Five hard questions upfront beats building the wrong thing fast." },
  { t: "Human + technical", d: "I've shipped the model and sat with the person who has to use it." },
  { t: "Execution with intent", d: "Shipped beats perfect. I optimize for what's live." },
];

export default function ApproachTeaser() {
  return (
    <section id="approach" className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> How I work
          </div>
        </Reveal>

        <div className="approach-grid">
          <Reveal delay={120}>
            <h2 className="section-title">
              I focus on <em className="serif-accent">clarity</em>.
            </h2>
          </Reveal>

          <Reveal delay={240}>
            <p className="section-body">
              Most problems on my desk aren&apos;t technical — they&apos;re unclear. I get the team aligned on what
              actually matters, then move fast without losing the plot.
            </p>
          </Reveal>
        </div>

        <div className="pillars-grid" style={{ marginTop: 56 }}>
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 100} y={20}>
              <div className="pillar">
                <h3 style={{ fontSize: 20, lineHeight: 1.25, letterSpacing: "-0.015em", fontWeight: 500, marginBottom: 12, fontFamily: "var(--font-display)" }}>
                  {p.t}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-dim)" }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={340}>
          <Link href="/approach" className="btn btn--ghost" style={{ marginTop: 40, display: "inline-flex" }}>
            See the full approach
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 6 }}>
              <path d="M3 6 H9 M6 3 L9 6 L6 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
