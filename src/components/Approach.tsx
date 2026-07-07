"use client";

import Reveal from "./Reveal";

const pillars = [
  { n: "01", t: "Clarity over noise", d: "Turns ambiguity into structured, actionable direction." },
  { n: "02", t: "Human + technical", d: "Bridges AI systems with real user behavior and team needs." },
  { n: "03", t: "Execution with intent", d: "Focuses on outcomes, not just output." },
  { n: "04", t: "Collaborative by design", d: "Aligns teams, incorporates perspectives, and moves work forward." },
];

export default function Approach() {
  return (
    <section id="approach" className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> 02 — How I work
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
              In complex systems, most problems aren&apos;t technical — they&apos;re unclear. I break things down to
              first principles, align teams around what matters, and move quickly toward outcomes that actually work.
            </p>
          </Reveal>
        </div>

        <div className="pillars-grid">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 100} y={28}>
              <div className="pillar">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                  <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--fg-dimmer)" }}>{p.n}</span>
                  <span style={{ width: 24, height: 1, background: "var(--hairline-strong)", display: "block" }} />
                </div>
                <h3 style={{ fontSize: 22, lineHeight: 1.25, letterSpacing: "-0.015em", fontWeight: 500, marginBottom: 14, fontFamily: "var(--font-display)" }}>
                  {p.t}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-dim)" }}>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
