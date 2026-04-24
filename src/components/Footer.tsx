"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: "var(--accent)",
                transform: "rotate(45deg)",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 500 }}>Nabeel Barqawi</span>
          </div>
          <div className="footer-tagline">Clarity · Impact · Real outcomes.</div>
        </div>

        <div className="footer-mega">Product.</div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} — Crafted with intent.</span>
          <span>Brooklyn · Remote-first</span>
          <a href="#top" className="footer-top-link">
            <span>Back to top</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 9 V3 M3 6 L6 3 L9 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
