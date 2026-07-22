"use client";

import { openBookingModal } from "./CalBookingButton";
import { useSiteUI } from "./SiteUI";
import { CONTACT_CARDS, CONTACT, type ContactCard } from "@/data/content";

export default function ContactCards() {
  const { openJoin } = useSiteUI();

  function handle(card: ContactCard) {
    if (card.kind === "drawer") {
      openJoin({
        eyebrow: card.title.toUpperCase(),
        title: "Let's talk.",
        subtitle: card.body,
        placeholder: "A few details about what you need…",
        button: `${card.action} →`,
        intent: card.title,
        success: "Message sent.",
        successNote: "Thanks — I'll get back to you soon.",
      });
    } else if (card.kind === "cal") {
      void openBookingModal();
    } else if (card.kind === "mailto") {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(card.title)}`;
    } else if (card.kind === "link" && card.href) {
      window.open(card.href, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <div className="grid-contact-cards">
      {CONTACT_CARDS.map((c) => (
        <div
          key={c.title}
          className="card-door"
          role="button"
          tabIndex={0}
          onClick={() => handle(c)}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handle(c); } }}
        >
          <div style={{ width: 48, height: 48, borderRadius: 13, background: "linear-gradient(135deg, var(--a1), var(--a2))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, color: "#0B0B12", fontSize: 20, marginBottom: 18 }}>{c.icon}</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, color: "#fff", letterSpacing: "-0.01em", marginBottom: 8 }}>{c.title}</h3>
          <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#a5a3b8", marginBottom: 16 }}>{c.body}</p>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--a2)" }}>{c.action} →</div>
        </div>
      ))}
    </div>
  );
}
