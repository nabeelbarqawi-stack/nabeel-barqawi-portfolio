"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const intents = ["Hire", "Coaching", "Advisory", "Other"];
const socials: [string, string][] = [
  ["LinkedIn", "https://linkedin.com/in/nabeelbarqawi"],
  ["X / Twitter", "https://x.com/nabeelbarqawi"],
  ["Substack", "https://nabeelbarqawi.substack.com"],
  ["GitHub", "https://github.com/nabeelbarqawi"],
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", intent: "Hire", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    const body = encodeURIComponent(`Intent: ${form.intent}\n\n${form.message}`);
    window.open(`mailto:nabeelbarqawi@gmail.com?subject=${encodeURIComponent(`Portfolio inquiry — ${form.intent}`)}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3200);
  };

  return (
    <section id="contact" className="section contact-section" style={{ borderTop: "1px solid var(--hairline)" }}>
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "60%",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)",
          filter: "blur(100px)",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <Reveal>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> 07 — Let&apos;s talk
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2
            className="display"
            style={{ fontSize: "clamp(48px, 8vw, 120px)", marginTop: 40, marginBottom: 40 }}
          >
            Let&apos;s build<br />something{" "}
            <em className="serif-accent">clear</em>.
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p style={{ fontSize: "clamp(18px, 2vw, 22px)", lineHeight: 1.5, color: "var(--fg-dim)", maxWidth: 620, marginBottom: 80, textWrap: "balance" } as React.CSSProperties}>
            Full-time, consulting, advisory, or fractional. Tell me the shape of the problem — I&apos;ll respond within 48 hours.
          </p>
        </Reveal>

        <div className="contact-grid">
          {/* Form */}
          <Reveal delay={320}>
            <form onSubmit={submit} className="contact-form">
              <div className="field">
                <label htmlFor="contact-name" className={`field-label ${focused === "name" || form.name ? "active" : ""}`}>Name</label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className="field-input"
                />
              </div>

              <div className="field">
                <label htmlFor="contact-email" className={`field-label ${focused === "email" || form.email ? "active" : ""}`}>Email</label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="field-input"
                />
              </div>

              <div className="field">
                <div className="field-label-static">I&apos;m interested in</div>
                <div className="intent-group">
                  {intents.map((intent) => (
                    <button
                      type="button"
                      key={intent}
                      onClick={() => setForm({ ...form, intent })}
                      className={`intent-chip ${form.intent === intent ? "active" : ""}`}
                    >
                      {intent}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label htmlFor="contact-message" className={`field-label ${focused === "message" || form.message ? "active" : ""}`}>
                  The shape of the problem
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="field-input"
                />
              </div>

              <button type="submit" className="btn btn--primary btn--full" disabled={sent}>
                {sent ? (
                  <>
                    Sent — talk soon
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 4 }}>
                      <path d="M3 7 L6 10 L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                ) : (
                  <>
                    Send message
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 4 }}>
                      <path d="M3 7 H11 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </Reveal>

          {/* Aside */}
          <Reveal delay={440}>
            <aside className="contact-aside">
              <div className="aside-block">
                <div className="aside-label">Direct</div>
                <a href="mailto:nabeelbarqawi@gmail.com" className="aside-link">
                  nabeelbarqawi@gmail.com
                </a>
              </div>
              <div className="aside-block">
                <div className="aside-label">Book time</div>
                <a href="https://cal.com/nabeelbarqawi" target="_blank" rel="noopener noreferrer" className="aside-link">
                  cal.com/nabeelbarqawi — 30 min
                </a>
              </div>
              <div className="aside-block">
                <div className="aside-label">Elsewhere</div>
                <div className="aside-socials">
                  {socials.map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="aside-social" aria-label={`${label} (opens in new tab)`}>
                      <span>{label}</span>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false">
                        <path d="M3 7 L7 3 M4 3 H7 V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
              <div className="aside-block" style={{ flexDirection: "row", alignItems: "center", gap: 14, paddingTop: 24, borderTop: "1px solid var(--hairline)" }}>
                <span className="status-dot" />
                <div>
                  <div style={{ fontSize: 13, color: "var(--fg)" }}>Available Q2 2026</div>
                  <div style={{ fontSize: 12, color: "var(--fg-dim)", marginTop: 2 }}>Select engagements only</div>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
