"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { NAV_GROUPS, FOOTER_NAV } from "@/data/content";

export default function Nav() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (match: string[]) => match.includes(pathname);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
        padding: "12px clamp(16px,3vw,40px)", background: "rgba(11,11,18,0.72)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <Link href="/" onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center" }} aria-label="Nabeel Barqawi — home">
        <span
          style={{
            fontFamily: "var(--font-wordmark)", fontWeight: 400, fontSize: 22, letterSpacing: "0.01em",
            background: "linear-gradient(135deg, var(--a2), var(--a1))",
            WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 14px color-mix(in srgb, var(--a2) 45%, transparent))",
          }}
        >
          Nabeel Barqawi
        </span>
      </Link>

      {/* Desktop nav */}
      <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {NAV_GROUPS.map((g) => (
          <div
            key={g.id}
            onMouseEnter={() => setOpenMenu(g.children ? g.id : null)}
            onMouseLeave={() => setOpenMenu(null)}
            style={{ position: "relative" }}
          >
            <Link href={g.href} className={`nav-item${isActive(g.match) ? " active" : ""}`}>
              {g.label}
              {g.children && <span className="nav-caret" aria-hidden>▾</span>}
            </Link>
            {g.children && openMenu === g.id && (
              <div style={{ position: "absolute", top: "100%", left: 0, paddingTop: 10 }}>
                <div className="nav-drop">
                  {g.children.map((c) => (
                    <Link key={c.href} href={c.href} className="nav-drop-item" onClick={() => setOpenMenu(null)}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{c.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#8f8da5" }}>{c.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop CTA */}
      <Link href="/contact" className="btn-book desktop-nav" style={{ display: "inline-block" }}>
        Book a call
      </Link>

      {/* Mobile toggle */}
      <button
        className="mobile-toggle"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((v) => !v)}
        style={{ width: 42, height: 42, borderRadius: 11, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }}
      >
        {mobileOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "absolute", top: "100%", left: 0, right: 0, display: "block",
            background: "rgba(13,13,20,0.98)", backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "12px clamp(16px,3vw,40px) 22px",
          }}
        >
          <div style={{ display: "grid", gap: 2 }}>
            <Link href="/" className={`nav-item${pathname === "/" ? " active" : ""}`} onClick={() => setMobileOpen(false)}>Home</Link>
            {FOOTER_NAV.map((l) => (
              <Link key={l.href} href={l.href} className={`nav-item${pathname === l.href ? " active" : ""}`} onClick={() => setMobileOpen(false)}>
                {l.label}
              </Link>
            ))}
          </div>
          <Link href="/contact" className="btn-book" onClick={() => setMobileOpen(false)} style={{ display: "block", textAlign: "center", marginTop: 14 }}>
            Book a call
          </Link>
        </div>
      )}
    </nav>
  );
}
