"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Incorrect password");
        setSubmitting(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error — please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} className="contact-form" noValidate style={{ width: 320 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 8 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: "var(--accent)",
              boxShadow: "0 0 20px var(--accent-glow)",
              transform: "rotate(45deg)",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Nabeel Barqawi</span>
          <span className="admin-badge">Admin</span>
        </div>

        <div className="field">
          <label htmlFor="admin-password" className="field-label active">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field-input"
          />
        </div>

        {error && <span className="field-error">{error}</span>}

        <button type="submit" className="btn btn--primary btn--full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
