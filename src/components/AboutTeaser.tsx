"use client";

import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

export default function AboutTeaser() {
  return (
    <section id="about" className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> About
          </div>
        </Reveal>

        <div className="about-grid">
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

          <div className="about-copy">
            <Reveal delay={200}>
              <h2 className="section-title" style={{ marginBottom: 32 }}>
                A non-linear path, <em className="serif-accent">on purpose</em>.
              </h2>
            </Reveal>

            <Reveal delay={300}>
              <p className="about-para">
                I didn&apos;t follow a straight line to product — an Arab American background taught me to hold
                multiple perspectives at once, and to notice the assumption everyone else is treating as fact.
                That instinct is now the actual job: finding the unclear goal underneath the technical problem.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <Link href="/about" className="btn btn--ghost" style={{ marginTop: 32, display: "inline-flex" }}>
                More about me &amp; past work
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 6 }}>
                  <path d="M3 6 H9 M6 3 L9 6 L6 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
