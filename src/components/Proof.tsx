"use client";

import Reveal from "./Reveal";

const items = [
  "Makes complex systems intuitive",
  "Brings clarity to ambiguity",
  "Trusted across teams and leadership",
  "Turns ideas into real products",
];

export default function Proof() {
  const doubled = [...items, ...items];

  return (
    <section className="section" style={{ borderTop: "1px solid var(--hairline)", paddingTop: 80, paddingBottom: 80 }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow" style={{ marginBottom: 40 }}>
            <span className="eyebrow-dot" /> 05 — In their words
          </div>
        </Reveal>
      </div>

      <div className="marquee-mask">
        <div className="marquee-track">
          {doubled.map((s, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-glyph">&ldquo;</span>
              <span>{s}</span>
              <span className="marquee-sep" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
