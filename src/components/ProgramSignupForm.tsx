"use client";

import { useState } from "react";
import type { ProgramSlug } from "@/lib/programs";

export default function ProgramSignupForm({ slug }: { slug: ProgramSlug }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout/create-session", {
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

      window.location.href = data.url;
    } catch {
      setError("Network error — please try again.");
      setSubmitting(false);
    }
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
        {submitting ? "Redirecting to checkout…" : "Continue to payment"}
      </button>
    </form>
  );
}
