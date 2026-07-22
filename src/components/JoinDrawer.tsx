"use client";

import { useEffect, useState } from "react";
import { Check, X } from "@phosphor-icons/react";

/**
 * Right-side slide-in "Join the community" drawer.
 * Collects name / email / message and submits to the existing Formspree form.
 */
export default function JoinDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [succeeded, setSucceeded] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, intent: "Join the community" }),
      });
      const data = await res.json().catch(() => ({}));

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

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, fontFamily: "var(--font-body)" }} role="dialog" aria-modal="true" aria-label="Join the community">
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(5,5,10,0.62)", backdropFilter: "blur(5px)", WebkitBackdropFilter: "blur(5px)", animation: "fadeInBg .3s ease" }}
      />
      <div
        style={{
          position: "absolute", top: 0, right: 0, height: "100%", width: "min(460px, 100%)",
          background: "#111119", borderLeft: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "-30px 0 90px rgba(0,0,0,0.6)", padding: "34px clamp(24px,3vw,40px) 40px",
          overflowY: "auto", animation: "slideInRight .32s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "var(--a2)" }}>JOIN THE COMMUNITY</div>
          <button className="drawer-close" onClick={onClose} aria-label="Close">
            <X size={18} weight="bold" />
          </button>
        </div>

        {succeeded ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 22px", display: "flex", alignItems: "center", justifyContent: "center", background: "color-mix(in srgb, var(--a2) 16%, transparent)", border: "1px solid color-mix(in srgb, var(--a2) 40%, transparent)" }}>
              <Check size={30} weight="bold" color="var(--a2)" />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "#fff", letterSpacing: "-0.02em", marginBottom: 10 }}>You&apos;re in!</h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#a5a3b8", marginBottom: 28 }}>Thanks for joining, watch your inbox for what&apos;s next.</p>
            <button className="btn-ghost" onClick={onClose} style={{ padding: "14px 26px", borderRadius: 12, fontSize: 14 }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 10 }}>Save your spot.</h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#a5a3b8", marginBottom: 28 }}>Tell me a little about yourself and I&apos;ll get you plugged into the community, events, resources, and office hours.</p>
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <label htmlFor="join-name" style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#c9c7db", marginBottom: 8 }}>Name</label>
                <input id="join-name" name="name" type="text" required placeholder="Your name" className="nb-input" style={{ width: "100%", padding: "14px 16px" }} />
              </div>
              <div>
                <label htmlFor="join-email" style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#c9c7db", marginBottom: 8 }}>Email</label>
                <input id="join-email" name="email" type="email" required placeholder="you@email.com" className="nb-input" style={{ width: "100%", padding: "14px 16px" }} />
              </div>
              <div>
                <label htmlFor="join-msg" style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#c9c7db", marginBottom: 8 }}>Message</label>
                <textarea id="join-msg" name="message" rows={4} placeholder="What are you hoping to learn or build?" className="nb-input" style={{ width: "100%", padding: "14px 16px", resize: "vertical" }} />
              </div>
              {error && <div style={{ fontSize: 12.5, color: "#ff8a8a" }}>{error}</div>}
              <button type="submit" className="btn-primary" disabled={submitting} style={{ marginTop: 6, padding: "16px 28px", borderRadius: 12, fontSize: 15 }}>
                {submitting ? "Sending…" : "Join the community →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
