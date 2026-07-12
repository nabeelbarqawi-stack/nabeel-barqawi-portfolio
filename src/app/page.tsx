import Link from "next/link";
import ImageFrame from "@/components/ImageFrame";
import Testimonial from "@/components/Testimonial";
import JoinCommunityButton from "@/components/JoinCommunityButton";
import { BRANDS, FEATURED_SERVICES, COMMUNITY_STATS, HOME_TALKS, HOME_TESTIMONIALS, HOME_RESOURCES } from "@/data/content";

export default function Home() {
  return (
    <div className="page-fade">
      {/* ============ HERO ============ */}
      <section style={{ position: "relative", background: "var(--ink)", padding: "150px clamp(20px,4vw,44px) 90px", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -120, right: -60, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--a1) 35%, transparent), transparent 65%)", filter: "blur(30px)", animation: "floatY 9s ease-in-out infinite" }} />
        <div aria-hidden style={{ position: "absolute", bottom: -160, left: -80, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, color-mix(in srgb, var(--a2) 22%, transparent), transparent 65%)", filter: "blur(30px)", animation: "floatY 11s ease-in-out infinite" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%,#000,transparent)", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%,#000,transparent)" }} />

        <div className="grid-hero" style={{ position: "relative", maxWidth: 1160, margin: "0 auto" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "8px 15px", borderRadius: 100, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12.5, fontWeight: 600, color: "#9b97b8", letterSpacing: "0.04em", marginBottom: 26 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--a2)", boxShadow: "0 0 10px var(--a2)", animation: "glowPulse 2s infinite" }} />
              PRODUCT LEADER · AI BUILDER · EDUCATOR
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(38px,5.2vw,66px)", lineHeight: 1.02, letterSpacing: "-0.03em", color: "#fff", marginBottom: 24 }}>
              Building the future of AI,<br />
              <span style={{ background: "linear-gradient(120deg, var(--a1), var(--a2))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>and helping people grow into it.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "#a5a3b8", maxWidth: 520, marginBottom: 36 }}>
              I help teams ship AI products that matter, and help people build the careers to lead them. Product leadership, hands-on AI education, and a growing community of builders.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/services" className="btn-primary" style={{ padding: "15px 28px", borderRadius: 12, fontSize: 15 }}>Work with me →</Link>
              <JoinCommunityButton className="btn-ghost" style={{ padding: "15px 28px", borderRadius: 12, fontSize: 15 }}>Join the community</JoinCommunityButton>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 0 0 1px color-mix(in srgb, var(--a1) 20%, transparent),0 30px 80px rgba(0,0,0,0.6)", aspectRatio: "4/5", background: "#111119" }}>
              <ImageFrame src="/portrait.png" alt="Nabeel Barqawi presenting" fit="cover" />
            </div>
            <div style={{ position: "absolute", bottom: -22, left: -26, padding: "16px 20px", borderRadius: 16, background: "rgba(17,17,25,0.85)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 12px 40px rgba(0,0,0,0.5)", animation: "floatY 6s ease-in-out infinite" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, color: "#fff" }}>500+</div>
              <div style={{ fontSize: 12, color: "#8f8da5", fontWeight: 600 }}>professionals taught</div>
            </div>
            <div style={{ position: "absolute", top: -18, right: -18, padding: "14px 18px", borderRadius: 16, background: "rgba(17,17,25,0.85)", backdropFilter: "blur(16px)", border: "1px solid color-mix(in srgb, var(--a2) 25%, transparent)", boxShadow: "0 12px 40px rgba(0,0,0,0.5)", animation: "floatY 7.5s ease-in-out infinite" }}>
              <div style={{ fontSize: 12, color: "var(--a2)", fontWeight: 700 }}>★ Leading AI experiences</div>
              <div style={{ fontSize: 12, color: "#8f8da5", fontWeight: 600 }}>at Disney</div>
            </div>
          </div>
        </div>

        {/* Trusted by */}
        <div style={{ position: "relative", maxWidth: 1160, margin: "80px auto 0", paddingTop: 34, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", color: "#6b6980", marginBottom: 20, textAlign: "center" }}>TRUSTED BY TEAMS &amp; LEADERS AT</div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            {BRANDS.map((b) => (
              <div key={b.id} style={{ width: 150, height: 54, borderRadius: 11, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", padding: "11px 18px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {b.src ? (
                  <ImageFrame src={b.src} alt={`${b.name} logo`} fit="contain" padded />
                ) : (
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "#6b6980", letterSpacing: "0.02em" }}>{b.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED SERVICES ============ */}
      <section style={{ background: "var(--paper)", color: "var(--paper-ink)", padding: "110px clamp(20px,4vw,44px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 48, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a1)", marginBottom: 12 }}>WHAT I DO</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-0.025em", maxWidth: 600, lineHeight: 1.06 }}>Ways I help you build, ship, and grow</h2>
            </div>
            <Link href="/services" className="btn-outline-dark" style={{ fontSize: 14.5, padding: "12px 22px", borderRadius: 11 }}>All services →</Link>
          </div>
          <div className="grid-3">
            {FEATURED_SERVICES.map((s) => (
              <Link key={s.name} href="/services" className="card-svc" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: "linear-gradient(135deg, var(--a1), var(--a2))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 700, color: "#fff", fontSize: 19, marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, marginBottom: 9, letterSpacing: "-0.01em" }}>{s.name}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#6B6A73" }}>{s.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMMUNITY PREVIEW ============ */}
      <section style={{ background: "var(--ink)", padding: "110px clamp(20px,4vw,44px)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: "20%", left: "40%", width: 600, height: 400, background: "radial-gradient(circle, color-mix(in srgb, var(--a1) 18%, transparent), transparent 70%)", filter: "blur(40px)" }} />
        <div className="grid-community-preview" style={{ position: "relative", maxWidth: 1160, margin: "0 auto", borderRadius: 28, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(135deg, color-mix(in srgb, var(--a1) 12%, transparent), color-mix(in srgb, var(--a2) 6%, transparent))", backdropFilter: "blur(20px)", padding: "clamp(36px,5vw,64px)" }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a2)", marginBottom: 14 }}>THE COMMUNITY</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px,3.4vw,42px)", color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.06, marginBottom: 18 }}>Work with me. Learn with others. Grow together.</h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: "#a5a3b8", marginBottom: 30, maxWidth: 480 }}>Office hours, workshops, free AI + PM resources, and a growing room of builders learning in the open. Something bigger than a single engagement.</p>
            <Link href="/community" className="btn-primary" style={{ padding: "14px 26px", borderRadius: 12, fontSize: 15, boxShadow: "none" }}>Explore the community →</Link>
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {COMMUNITY_STATS.map((c) => (
              <div key={c.label} style={{ padding: "20px 24px", borderRadius: 16, background: "rgba(11,11,18,0.55)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, background: "linear-gradient(120deg, var(--a1), var(--a2))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{c.num}</div>
                <div style={{ fontSize: 13.5, color: "#a5a3b8", fontWeight: 600 }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SPEAKING HIGHLIGHTS ============ */}
      <section style={{ background: "var(--paper)", color: "var(--paper-ink)", padding: "110px clamp(20px,4vw,44px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a1)", marginBottom: 12 }}>ON STAGE</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-0.025em", marginBottom: 44 }}>Speaking highlights</h2>
          <div className="grid-2">
            {HOME_TALKS.map((t) => (
              <div key={t.slot} style={{ background: "#fff", border: "1px solid #E7E5E0", borderRadius: 18, overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "16/9", background: "var(--ink)" }}>
                  <ImageFrame alt={`${t.event} talk photo`} placeholder="Add a talk photo" />
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--a1)", marginBottom: 8 }}>{t.event}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 19, letterSpacing: "-0.01em" }}>{t.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <Link href="/speaking" className="btn-outline-dark" style={{ marginTop: 28, fontSize: 14.5, padding: "12px 22px", borderRadius: 11 }}>See all talks &amp; topics →</Link>
        </div>
      </section>

      {/* ============ SUCCESS STORIES ============ */}
      <section style={{ background: "var(--ink)", padding: "110px clamp(20px,4vw,44px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a2)", marginBottom: 12 }}>STUDENT SUCCESS</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", color: "#fff", letterSpacing: "-0.025em", marginBottom: 44 }}>What people say after working with me</h2>
          <div className="grid-3">
            {HOME_TESTIMONIALS.map((q) => (
              <Testimonial key={q.name} {...q} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ LATEST CONTENT ============ */}
      <section style={{ background: "var(--paper)", color: "var(--paper-ink)", padding: "110px clamp(20px,4vw,44px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 44, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a1)", marginBottom: 12 }}>LEARN WITH ME</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px,3.6vw,44px)", letterSpacing: "-0.025em" }}>Latest content</h2>
            </div>
            <Link href="/resources" className="btn-outline-dark" style={{ fontSize: 14.5, padding: "12px 22px", borderRadius: 11 }}>Resource hub →</Link>
          </div>
          <div className="grid-3">
            {HOME_RESOURCES.map((r) => (
              <Link key={r.title} href="/resources" className="card-content" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                <div style={{ aspectRatio: "16/10", background: "linear-gradient(135deg,#151521,#0B0B12)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(color-mix(in srgb, var(--a1) 12%, transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb, var(--a1) 12%, transparent) 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--a2)", position: "relative" }}>{r.type}</div>
                </div>
                <div style={{ padding: 22 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--a1)", marginBottom: 8 }}>{r.cat}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em", lineHeight: 1.25 }}>{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
