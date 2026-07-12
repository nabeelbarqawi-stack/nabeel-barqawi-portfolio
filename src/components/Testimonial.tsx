type Props = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  /** light card (coaching) vs. dark glass card (home/community) */
  light?: boolean;
};

export default function Testimonial({ quote, name, role, initials, light = false }: Props) {
  return (
    <div
      style={{
        background: light ? "#fff" : "rgba(255,255,255,0.03)",
        border: light ? "1px solid #E7E5E0" : "1px solid rgba(255,255,255,0.09)",
        borderRadius: 18,
        padding: light ? 30 : 28,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <p style={{ fontSize: light ? 15.5 : 15, lineHeight: 1.6, color: light ? "#3a3941" : "#c9c7db", marginBottom: light ? 20 : 22 }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
        <div style={{ width: light ? 42 : 40, height: light ? 42 : 40, borderRadius: "50%", background: "linear-gradient(135deg, var(--a1), var(--a2))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, color: "#0B0B12", fontSize: 15, flexShrink: 0 }}>
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: light ? 14.5 : 14, color: light ? "#16151A" : "#fff" }}>{name}</div>
          <div style={{ fontSize: light ? 12.5 : 12, color: light ? "#6B6A73" : "#8f8da5" }}>{role}</div>
        </div>
      </div>
    </div>
  );
}
