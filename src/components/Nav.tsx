"use client";

import { useState } from "react";
import { useScrollY } from "@/hooks/useScrollUtils";

const links: [string, string][] = [
  ["Work", "#work"],
  ["Approach", "#approach"],
  ["Services", "#services"],
  ["About", "#about"],
];

export default function Nav() {
  const y = useScrollY();
  const scrolled = y > 40;
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "14px 0" : "28px 0",
        transition: "padding 400ms cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 400ms",
        backdropFilter: (scrolled || open) ? "saturate(160%) blur(20px)" : "blur(0)",
        WebkitBackdropFilter: (scrolled || open) ? "saturate(160%) blur(20px)" : "blur(0)",
        background: (scrolled || open) ? "rgba(242,241,238,0.90)" : "transparent",
        borderBottom: (scrolled || open) ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--fg)" }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: "var(--accent)",
              boxShadow: "0 0 20px var(--accent-glow)",
              transform: "rotate(45deg)",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 14, letterSpacing: "-0.01em", fontWeight: 500 }}>Nabeel Barqawi</span>
        </a>

        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              style={{ fontSize: 13, color: "var(--fg-dim)", textDecoration: "none", letterSpacing: "-0.005em", transition: "color 200ms" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--fg)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--fg-dim)")}
            >
              {label}
            </a>
          ))}
          <a href="#contact" className="btn btn--sm btn--primary">
            Get in touch
          </a>
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          style={{ display: "none", background: "transparent", border: "none", color: "var(--fg)", cursor: "pointer", padding: 8 }}
        >
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
            <path d={open ? "M2 2 L20 12 M2 12 L20 2" : "M0 1 H22 M0 13 H22"} stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      <div
        className="mobile-menu"
        style={{
          display: "none",
          maxHeight: open ? 360 : 0,
          overflow: "hidden",
          transition: "max-height 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          borderTop: open ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          marginTop: open ? 12 : 0,
          background: "rgba(242,241,238,0.98)",
        }}
      >
        <div className="container" style={{ padding: "24px 0 28px", display: "flex", flexDirection: "column", gap: 20 }}>
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{ fontSize: 18, color: "var(--fg)", textDecoration: "none" }}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn--primary" style={{ marginTop: 8 }}>
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
