"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollProgress, mapRange } from "@/hooks/useScrollUtils";
import Reveal from "./Reveal";

interface Metric {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}
interface DetailBlock {
  label: string;
  body: string;
}
interface Project {
  name: string;
  tag: string;
  summary: string;
  gradient: string;
  accent: string;
  chip: string;
  lines: number[];
  pills: string[];
  metrics: Metric[];
  detail: DetailBlock[];
}

function MetricCounter({ value, suffix = "", prefix = "", decimals = 0, inView }: Metric & { inView: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1400;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span>
      {prefix}
      {decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString()}
      {suffix}
    </span>
  );
}

function CaseStudy({ index, project, expanded, onToggle }: {
  index: number;
  project: Project;
  expanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref as React.RefObject<HTMLElement | null>, "through");
  const inView = p > 0.2;

  const visualScale = mapRange(p, 0.0, 0.5, 0.88, 1);
  const visualY = mapRange(p, 0.0, 0.5, 60, 0);
  const visualOpacity = mapRange(p, 0.0, 0.35, 0, 1);
  const headerY = mapRange(p, 0.1, 0.5, 40, 0);
  const headerOpacity = mapRange(p, 0.1, 0.5, 0, 1);

  return (
    <article ref={ref} className="case">
      <div
        className="case-header"
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          transition: "opacity 120ms linear, transform 120ms linear",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--fg-dimmer)" }}>
            CASE {String(index + 1).padStart(2, "0")}
          </span>
          <span style={{ width: 40, height: 1, background: "var(--hairline-strong)", display: "block" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--fg-dim)" }}>{project.tag}</span>
        </div>
        <h3 className="case-title">{project.name}</h3>
        <p className="case-summary">{project.summary}</p>
      </div>

      {/* Visual */}
      <div
        className="case-visual"
        style={{
          opacity: visualOpacity,
          transform: `translateY(${visualY}px) scale(${visualScale})`,
          transformOrigin: "center 60%",
          willChange: "transform, opacity",
          transition: "opacity 140ms linear, transform 140ms linear",
        }}
      >
        <div className="case-visual-inner" style={{ background: project.gradient }}>
          <div className="case-surface">
            <div className="case-chip">
              <span className="case-chip-dot" style={{ background: project.accent }} />
              <span>{project.chip}</span>
            </div>
            <div className="case-lines">
              {project.lines.map((l, i) => (
                <div
                  key={i}
                  className="case-line"
                  style={{
                    width: l + "%",
                    opacity: inView ? 1 : 0,
                    transition: `opacity 700ms ${i * 120 + 200}ms, transform 700ms ${i * 120 + 200}ms`,
                    transform: inView ? "translateX(0)" : "translateX(-12px)",
                  }}
                />
              ))}
            </div>
            <div className="case-pill-row">
              {project.pills.map((pill, i) => (
                <div
                  key={i}
                  className="case-pill"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(8px)",
                    transition: `opacity 600ms ${600 + i * 80}ms, transform 600ms ${600 + i * 80}ms`,
                  }}
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="case-metrics">
        {project.metrics.map((m, i) => (
          <div key={i} className="metric">
            <div className="metric-value">
              <MetricCounter {...m} inView={inView} />
            </div>
            <div className="metric-label">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Expand */}
      <button className="case-expand" onClick={onToggle} aria-expanded={expanded}>
        <span>{expanded ? "Collapse" : "Read the detail"}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 400ms" }}>
          <path d="M3 5 L7 9 L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Detail drawer */}
      <div
        style={{
          maxHeight: expanded ? 600 : 0,
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms",
          marginTop: expanded ? 24 : 0,
        }}
      >
        <div className="case-detail-inner">
          {project.detail.map((block, i) => (
            <div key={i} className="detail-block">
              <div className="detail-label">{block.label}</div>
              <p className="detail-body">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

const projects: Project[] = [
  {
    name: "Disney AI Agent",
    tag: "Entertainment · Conversational AI",
    summary:
      "An AI-powered virtual assistant supporting 2M+ monthly users — scaled automations across sign-up, account management, and refunds.",
    gradient: "linear-gradient(135deg, #0b1530 0%, #1a1f4d 50%, #0d1b3a 100%)",
    accent: "#6ea8ff",
    chip: "Live · Automated Assist",
    lines: [82, 64, 74, 48],
    pills: ["Sign-up", "Account", "Refunds", "Billing"],
    metrics: [
      { value: 2, suffix: "M+", label: "Monthly users" },
      { value: 97, suffix: "%", label: "Containment" },
      { value: 2.8, suffix: "%", label: "Conversion", decimals: 1 },
    ],
    detail: [
      { label: "Context", body: "A sprawling product surface meant support volume was scaling faster than the team could staff. The assistant had to understand intent across dozens of account states without sending users back to humans unnecessarily." },
      { label: "Approach", body: "Mapped the top 40 intents against real conversation logs, then rebuilt the automation tree around what users were actually trying to do — not what the org chart said. Built a feedback loop so low-confidence turns went to human review and fed back into training." },
      { label: "Outcome", body: "Reached ~97% containment on covered intents while lifting conversion on paywalled flows. The same pattern now powers three adjacent surfaces." },
    ],
  },
  {
    name: "CarMax AI Agent",
    tag: "Retail · Web + SMS",
    summary:
      "Conversational AI across web and SMS — millions of interactions annually, reduced engineering overhead, and $5M+ in cost savings.",
    gradient: "linear-gradient(135deg, #1a0f0a 0%, #3a2418 50%, #1c120b 100%)",
    accent: "#ffb17a",
    chip: "Omnichannel · Web + SMS",
    lines: [70, 88, 56, 72],
    pills: ["Inventory", "Financing", "Trade-in", "Delivery"],
    metrics: [
      { value: 40, suffix: "%", label: "Containment" },
      { value: 5, prefix: "$", suffix: "M+", label: "Cost savings" },
      { value: 16, prefix: "+", suffix: "%", label: "Automation improvement" },
    ],
    detail: [
      { label: "Context", body: "Two channels with very different expectations — SMS needed to feel like a friendly text, web needed to feel like a polished concierge. Both had to hand off to a human without losing state." },
      { label: "Approach", body: "Designed a channel-aware response layer on top of a single intent model, so the same brain produced channel-native copy. Instrumented every handoff so we could measure real containment, not just deflection." },
      { label: "Outcome", body: "Lifted automation success materially, reduced engineering overhead on maintenance, and unlocked $5M+ in annualized cost savings." },
    ],
  },
];

export default function SelectedWork() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="work" className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> 03 — Selected work
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40, marginTop: 32, flexWrap: "wrap" }}>
            <h2 className="section-title" style={{ maxWidth: 900 }}>
              Two projects. Millions of users. Measurable outcomes.
            </h2>
            <a href="/nabeel-barqawi-resume.pdf" target="_blank" rel="noopener" className="resume-link">
              <span>Download résumé</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 2 V10 M3.5 6.5 L7 10 L10.5 6.5 M2.5 12 H11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>

        <div className="work-grid">
          {projects.map((p, i) => (
            <CaseStudy
              key={p.name}
              index={i}
              project={p}
              expanded={expanded === i}
              onToggle={() => setExpanded(expanded === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
