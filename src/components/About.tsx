"use client";

import Reveal from "./Reveal";
import Image from "next/image";

const facts = [
  ["Based in", "Brooklyn, NY"],
  ["Working on", "AI agents, conversational UX"],
  ["Open to", "Full-time · Consulting · Advisory"],
];

export default function About() {
  return (
    <section id="about" className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> 06 — About
          </div>
        </Reveal>

        <div className="about-grid">
          {/* Portrait */}
          <Reveal delay={120}>
            <div className="portrait-frame">
              <div className="portrait-inner">
                <Image
                  src="/nabeel.jpg"
                  alt="Nabeel Barqawi"
                  fill
                  sizes="(max-width: 900px) 100vw, 420px"
                  className="portrait-img"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
                <div className="portrait-vignette" />
              </div>
              <div className="portrait-caption">
                <span className="portrait-dot" />
                <span>Brooklyn · Remote-first</span>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="about-copy">
            <Reveal delay={200}>
              <h2 className="section-title" style={{ marginBottom: 40 }}>
                A non-linear path, <em className="serif-accent">on purpose</em>.
              </h2>
            </Reveal>

            <Reveal delay={300}>
              <p className="about-para">
                I didn&apos;t follow a straight line to product. That&apos;s the point. An Arab American background
                taught me to hold multiple perspectives at once — to be comfortable where definitions are fuzzy and
                assumptions are unstable.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p className="about-para">
                That comfort with ambiguity is now a superpower. In AI especially, the hardest problems aren&apos;t
                the models — they&apos;re the unclear goals, the unstated constraints, the human behavior you can&apos;t
                specify upfront. I bring clarity to that.
              </p>
            </Reveal>

            <Reveal delay={500}>
              <div className="about-facts">
                {facts.map(([k, v]) => (
                  <div key={k} className="fact-row">
                    <span className="fact-key">{k}</span>
                    <span className="fact-val">{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
