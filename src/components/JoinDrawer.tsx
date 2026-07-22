"use client";

import { useEffect, useState } from "react";
import { Check, X } from "@phosphor-icons/react";
import type { JoinContext } from "./SiteUI";

const DEFAULT_CTX = {
  eyebrow: "JOIN THE COMMUNITY",
  title: "Save your spot.",
  subtitle: "Tell me a little about yourself and I'll get you plugged into the community, events, resources, and office hours.",
  placeholder: "What are you hoping to learn or build?",
  button: "Join the community →",
  intent: "Join the community",
  success: "You're in!",
  successNote: "Thanks for joining, watch your inbox for what's next.",
};

/**
 * Right-side slide-in contact drawer. Collects name / email / message and posts
 * to /api/contact (persisted to Supabase). Personalized by the optional
 * `context` set by whatever opened it (see SiteUI.openJoin).
 */
export default function JoinDrawer({
  open,
  onClose,
  context,
}: {
  open: boolean;
  onClose: () => void;
  context?: JoinContext;
}) {
  const c = {
    eyebrow: context?.eyebrow ?? DEFAULT_CTX.eyebrow,
    title: context?.title ?? DEFAULT_CTX.title,
    subtitle: context?.subtitle ?? DEFAULT_CTX.subtitle,
    placeholder: context?.placeholder ?? DEFAULT_CTX.placeholder,
    button: context?.button ?? DEFAULT_CTX.button,
    intent: context?.intent ?? DEFAULT_CTX.intent,
    success: context?.success ?? DEFAULT_CTX.success,
    successNote: context?.successNote ?? DEFAULT_CTX.successNote,
  };

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
        body: JSON.stringify({ name, email, message, intent: c.intent }),
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

  // Reset the success/error state each time the drawer is (re)opened, so a new
  // context doesn't show a stale confirmation from a previous submission.
  useEffect(() => {
    if (open) {
      setSucceeded(false);
      setError(null);
      setSubmitting(false);
    }
  }, [open, context]);

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
    <div style={{ position: "fixed", inset: 0, zIndex: 200, fontFamily: "var(--font-body)" }} role="dialog" aria-modal="true" aria-label={c.eyebrow}>
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
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "var(--a2)" }}>{c.eyebrow}</div>
          <button className="drawer-close" onClick={onClose} aria-label="Close">
            <X size={18} weight="bold" />
          </button>
        </div>

        {succeeded ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 22px", display: "flex", alignItems: "center", justifyContent: "center", background: "color-mix(in srgb, var(--a2) 16%, transparent)", border: "1px solid color-mix(in srgb, var(--a2) 40%, transparent)" }}>
              <Check size={30} weight="bold" color="var(--a2)" />
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, color: "#fff", letterSpacing: "-0.02em", marginBottom: 10 }}>{c.success}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#a5a3b8", marginBottom: 28 }}>{c.successNote}</p>
            <button className="btn-ghost" onClick={onClose} style={{ padding: "14px 26px", borderRadius: 12, fontSize: 14 }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 10 }}>{c.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: "#a5a3b8", marginBottom: 28 }}>{c.subtitle}</p>
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
                <textarea id="join-msg" name="message" rows={4} placeholder={c.placeholder} className="nb-input" style={{ width: "100%", padding: "14px 16px", resize: "vertical" }} />
              </div>
              {error && <div style={{ fontSize: 12.5, color: "#ff8a8a" }}>{error}</div>}
              <button type="submit" className="btn-primary" disabled={submitting} style={{ marginTop: 6, padding: "16px 28px", borderRadius: 12, fontSize: 15 }}>
                {submitting ? "Sending…" : c.button}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
