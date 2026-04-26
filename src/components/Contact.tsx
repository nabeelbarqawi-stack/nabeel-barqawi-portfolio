"use client";

import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Reveal from "./Reveal";
import CalBookingButton from "./CalBookingButton";

const intents = ["Hire", "Coaching", "Advisory", "Other"];
const socials: [string, string][] = [
  ["LinkedIn", "https://linkedin.com/in/nabeelbarqawi"],
  ["GitHub", "https://github.com/nabeelbarqawi-stack"],
];

export default function Contact() {
  const [state, handleSubmit] = useForm("xqewjded");
  const [intent, setIntent] = useState("Hire");
  const [focused, setFocused] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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
            {state.succeeded ? (
              <div
                className="contact-form"
                style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: 16, minHeight: 320 }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="15" stroke="var(--accent)" strokeWidth="1.5" />
                  <path d="M10 16.5 L14 20.5 L22 12" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 600, color: "var(--fg)", lineHeight: 1.3 }}>
                  Message sent — talk soon.
                </p>
                <p style={{ fontSize: 15, color: "var(--fg-dim)", lineHeight: 1.6 }}>
                  I&apos;ll get back to you within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                {/* Hidden field so Formspree receives the selected intent */}
                <input type="hidden" name="intent" value={intent} />

                <div className="field">
                  <label htmlFor="contact-name" className={`field-label ${focused === "name" || name ? "active" : ""}`}>Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    className="field-input"
                    aria-invalid={!!state.errors?.getFormErrors().length}
                  />
                  <ValidationError field="name" prefix="Name" errors={state.errors} className="field-error" />
                </div>

                <div className="field">
                  <label htmlFor="contact-email" className={`field-label ${focused === "email" || email ? "active" : ""}`}>Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className="field-input"
                    aria-invalid={!!state.errors?.getFieldErrors("email").length}
                  />
                  <ValidationError field="email" prefix="Email" errors={state.errors} className="field-error" />
                </div>

                <div className="field">
                  <div className="field-label-static">I&apos;m interested in</div>
                  <div className="intent-group" role="group" aria-label="Engagement type">
                    {intents.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setIntent(item)}
                        className={`intent-chip ${intent === item ? "active" : ""}`}
                        aria-pressed={intent === item}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="contact-message" className={`field-label ${focused === "message" || message ? "active" : ""}`}>
                    The shape of the problem
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className="field-input"
                  />
                  <ValidationError field="message" prefix="Message" errors={state.errors} className="field-error" />
                </div>

                {/* Form-level error (e.g. network failure) */}
                <ValidationError errors={state.errors} className="field-error" />

                <button type="submit" className="btn btn--primary btn--full" disabled={state.submitting}>
                  {state.submitting ? (
                    <>Sending…</>
                  ) : (
                    <>
                      Send message
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ marginLeft: 4 }}>
                        <path d="M3 7 H11 M7 3 L11 7 L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
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
                <CalBookingButton className="aside-link" style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", font: "inherit" }}>
                  Book time with me — 30 min
                </CalBookingButton>
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
