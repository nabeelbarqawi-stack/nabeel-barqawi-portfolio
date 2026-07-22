import JoinCommunityButton from "@/components/JoinCommunityButton";
import { Handshake, Brain, PresentationChart, MicrophoneStage } from "@phosphor-icons/react/dist/ssr";
import { SERVICES, type Service } from "@/data/content";

export const metadata = { title: "Services — Nabeel Barqawi" };

const ICONS = {
  handshake: Handshake,
  brain: Brain,
  "presentation-chart": PresentationChart,
  "microphone-stage": MicrophoneStage,
} as const;

function ServiceIcon({ name }: { name: Service["picon"] }) {
  const Icon = ICONS[name];
  return <Icon size={32} weight="bold" color="#fff" />;
}

export default function ServicesPage() {
  return (
    <div className="page-fade">
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,4vw,44px) 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(circle, color-mix(in srgb, var(--a1) 22%, transparent), transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a2)", marginBottom: 16 }}>SERVICES</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(34px,4.6vw,58px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.04, marginBottom: 22 }}>Four ways we can work together</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#a5a3b8" }}>From a single workshop to hands-on consulting, engagements built around outcomes, not hours.</p>
        </div>
      </section>

      <section style={{ background: "var(--paper)", color: "var(--paper-ink)", padding: "80px clamp(20px,4vw,44px) 110px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gap: 24 }}>
          {SERVICES.map((s) => (
            <div key={s.name} className="grid-service-row" style={{ background: "#fff", border: "1px solid #E7E5E0", borderRadius: 22, padding: "clamp(28px,4vw,44px)", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ width: 64, height: 64, borderRadius: 17, background: "linear-gradient(135deg, var(--a1), var(--a2))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <ServiceIcon name={s.picon} />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 27, letterSpacing: "-0.02em", marginBottom: 8 }}>{s.name}</h3>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: "#4d4c55", marginBottom: 24, maxWidth: 640 }}>{s.blurb}</p>
                <div className="grid-svc-detail" style={{ marginBottom: 24 }}>
                  {([["WHO IT'S FOR", s.who], ["PROBLEMS IT SOLVES", s.solves], ["OUTCOMES", s.outcomes], ["PROCESS", s.process]] as const).map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.08em", color: "var(--a1)", marginBottom: 6 }}>{label}</div>
                      <div style={{ fontSize: 14.5, lineHeight: 1.5, color: "#3a3941" }}>{val}</div>
                    </div>
                  ))}
                </div>
                <JoinCommunityButton className="btn-dark-accent" style={{ padding: "12px 22px", borderRadius: 11, fontSize: 14 }}>{s.cta} →</JoinCommunityButton>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
