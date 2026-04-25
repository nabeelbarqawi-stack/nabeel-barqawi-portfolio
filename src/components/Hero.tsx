"use client";

import { useRef } from "react";
import { useScrollY, easeOutCubic } from "@/hooks/useScrollUtils";
import Reveal from "./Reveal";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const y = useScrollY();

  const p = typeof window !== "undefined"
    ? Math.max(0, Math.min(1, y / (window.innerHeight * 0.85)))
    : 0;
  const eased = easeOutCubic(p);
  const heroOpacity = 1 - eased;
  const heroScale = 1 - eased * 0.05;
  const heroY = eased * -30;
  const parallax = Math.min(y * 0.2, 120);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="hero-section"
    >
      {/* Ambient glow — coral upper-left */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-5%",
          left: "-20%",
          width: "80%",
          height: "85%",
          background: "radial-gradient(ellipse, rgba(255,95,60,0.42) 0%, rgba(255,140,80,0.18) 45%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          transform: `translateY(${parallax * 0.3}px)`,
        }}
      />
      {/* Ambient glow — periwinkle lower-right */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-25%",
          right: "-25%",
          width: "75%",
          height: "85%",
          background: "radial-gradient(ellipse, rgba(95,125,235,0.40) 0%, rgba(75,100,210,0.15) 45%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />
      {/* Warm peach bloom — center bridge */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "25%",
          width: "50%",
          height: "50%",
          background: "radial-gradient(ellipse, rgba(255,175,120,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          opacity: heroOpacity,
          transform: `translateY(${heroY}px) scale(${heroScale})`,
          transformOrigin: "center 40%",
          willChange: "opacity, transform",
        }}
      >
        {/* Eyebrow */}
        <Reveal delay={100} y={12}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                boxShadow: "0 0 12px var(--accent)",
                animation: "pulse 2.4s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)" }}>
              Product &amp; AI
            </span>
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={200}>
          <h1 className="hero-headline">
            Making complex<br />
            systems <em className="serif-accent">simple</em>
            <span style={{ color: "var(--accent)" }}>.</span>
          </h1>
        </Reveal>

        {/* Subline */}
        <Reveal delay={420} y={14}>
          <p className="hero-subline">
            AI-powered. Human-centered. Product-driven.
          </p>
        </Reveal>

        {/* Support */}
        <Reveal delay={600} y={12}>
          <p className="hero-support">
            I build products and experiences used by millions.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={780} y={14}>
          <div className="hero-ctas">
            <a href="#contact" className="btn btn--primary">
              Hire me for your team
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 2 }}>
                <path d="M3 7 H11 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#services" className="btn btn--ghost">Book 1:1 coaching</a>
            <a href="#contact" className="btn btn--text">
              Get in touch
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 4, opacity: 0.8 }}>
                <path d="M3 6 H9 M6 3 L9 6 L6 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>

        {/* Scroll hint */}
        <Reveal delay={1000} y={8}>
          <div
            style={{
              marginTop: 80,
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "var(--fg-dimmer)",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <span>Scroll</span>
            <span
              style={{
                width: 40,
                height: 1,
                background: "var(--fg-dimmer)",
                position: "relative",
                overflow: "hidden",
                display: "block",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "var(--fg)",
                  animation: "scrollLine 2.4s ease-in-out infinite",
                  transformOrigin: "left",
                }}
              />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
