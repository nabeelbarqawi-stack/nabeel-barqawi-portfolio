"use client";

import Reveal from "./Reveal";

const pillars = [
  { n: "01", t: "Clarity over noise", d: "I'd rather spend the first session asking questions than have us build the wrong thing fast." },
  { n: "02", t: "Human + technical", d: "I've built the model and sat with the person who has to use it — both sides of the same problem." },
  { n: "03", t: "Execution with intent", d: "I'd rather ship something real this week than polish a plan no one acts on." },
  { n: "04", t: "Collaborative by design", d: "The best answer is rarely mine alone — I build it with the people who have to live with it." },
];

export default function Approach() {
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
              Most problems on my desk aren&apos;t technical — they&apos;re unclear. I break things down to first
              principles, get the team aligned on what actually matters, and move fast without losing the plot.
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
