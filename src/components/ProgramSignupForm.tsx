"use client";

import { useState } from "react";
import type { ProgramSlug } from "@/lib/programs";

export default function ProgramSignupForm({ slug, ctaLabel }: { slug: ProgramSlug; ctaLabel: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/leads/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, email, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong — please try again.");
        setSubmitting(false);
        return;
      }

      setSucceeded(true);
    } catch {
      setError("Network error — please try again.");
      setSubmitting(false);
    }
  }

  if (succeeded) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="15" stroke="var(--accent)" strokeWidth="1.5" />
          <path d="M10 16.5 L14 20.5 L22 12" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p style={{ fontSize: 18, fontWeight: 600, color: "var(--fg)" }}>Got it — I&apos;ll be in touch.</p>
        <p style={{ fontSize: 14, color: "var(--fg-dim)" }}>Check your email for confirmation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      <div className="field">
        <label htmlFor="signup-name" className={`field-label ${focused === "name" || name ? "active" : ""}`}>Name</label>
        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          className="field-input"
        />
      </div>

      <div className="field">
        <label htmlFor="signup-email" className={`field-label ${focused === "email" || email ? "active" : ""}`}>Email</label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          className="field-input"
        />
      </div>

      <div className="field">
        <label htmlFor="signup-message" className={`field-label ${focused === "message" || message ? "active" : ""}`}>
          Anything I should know? (optional)
        </label>
        <textarea
          id="signup-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          className="field-input"
        />
      </div>

      {error && <span className="field-error">{error}</span>}

      <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
        {submitting ? "Sending…" : ctaLabel}
      </button>
    </form>
  );
}
