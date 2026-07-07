"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const items = [
  { t: "Break Into Product", d: "For engineers and operators making the jump into product. Frameworks that actually translate.", cta: "Start here" },
  { t: "AI for Teams", d: "Workshops and working sessions that get teams shipping with AI — not just talking about it.", cta: "See outline" },
  { t: "Learn AI (Practical)", d: "Self-directed curriculum for product people who want fluency, not vocabulary.", cta: "Preview" },
  { t: "Career Coaching", d: "1:1 work on positioning, portfolio, interviews, and the next 12 months.", cta: "Book intro" },
];

export default function Services() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="services" className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> 04 — What I do
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="section-title" style={{ marginTop: 32, maxWidth: 900 }}>
            Four ways to work together.
          </h2>
        </Reveal>

        <div className="services-list" style={{ marginTop: 80 }}>
          {items.map((item, i) => (
            <Reveal key={item.t} delay={i * 80} y={20}>
              <div
                className="service-row"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ background: hover === i ? "var(--surface)" : "transparent" }}
              >
                <div className="service-index">0{i + 1}</div>
                <div className="service-title">{item.t}</div>
                <div className="service-desc">{item.d}</div>
                <a href="#contact" className="service-cta" id={item.t === "Career Coaching" ? "coaching" : undefined}>
                  <span>{item.cta}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6 H9 M6 3 L9 6 L6 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
