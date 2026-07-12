import Link from "next/link";
import Testimonial from "@/components/Testimonial";
import NewsletterForm from "@/components/NewsletterForm";
import { COMMUNITY_AREAS, EVENTS, COMMUNITY_TESTIMONIALS } from "@/data/content";

export const metadata = { title: "Community — Nabeel Barqawi" };

export default function CommunityPage() {
  return (
    <div className="page-fade">
      {/* Hero + email capture */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,4vw,44px) 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%,#000,transparent)", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%,#000,transparent)" }} />
        <div aria-hidden style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: "radial-gradient(circle, color-mix(in srgb, var(--a2) 20%, transparent), transparent 70%)", filter: "blur(40px)" }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a2)", marginBottom: 16 }}>THE COMMUNITY</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px,5vw,62px)", color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.03, marginBottom: 22 }}>Something bigger than a single engagement.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#a5a3b8", marginBottom: 34 }}>Because growth is better together.</p>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <NewsletterForm
              buttonText="Keep me updated →"
              source="Community signup"
              center
              minInputWidth={240}
              successVariant="boxed"
              successTitle="You're in, welcome to the community."
              successText="Watch your inbox for what's next."
              helper="Free AI + product resources, event invites, and office-hours reminders. No spam, unsubscribe anytime."
            />
          </div>
        </div>
      </section>

      {/* Areas + events */}
      <section style={{ background: "var(--paper)", color: "var(--paper-ink)", padding: "100px clamp(20px,4vw,44px)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div className="grid-3" style={{ marginBottom: 24 }}>
            {COMMUNITY_AREAS.map((a) => (
              <div key={a.title} className="card-svc" style={{ cursor: "default" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--a2)", marginBottom: 14, letterSpacing: "0.06em" }}>{a.badge}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20, letterSpacing: "-0.01em", marginBottom: 9 }}>{a.title}</h3>
                <p style={{ fontSize: 14.5, lineHeight: 1.55, color: "#6B6A73" }}>{a.body}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--ink)", borderRadius: 24, padding: "clamp(32px,5vw,56px)", marginTop: 56 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(24px,3vw,34px)", color: "#fff", letterSpacing: "-0.02em", marginBottom: 32 }}>Upcoming events &amp; office hours</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {EVENTS.map((e) => (
                <div key={e.title} style={{ display: "flex", alignItems: "center", gap: 24, padding: "20px 24px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
                  <div style={{ textAlign: "center", minWidth: 72 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, lineHeight: 1.2, color: "var(--a2)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Coming<br />soon</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, color: "#fff" }}>{e.title}</h3>
                    <div style={{ fontSize: 13, color: "#a5a3b8", marginTop: 2 }}>{e.kind} · {e.place}</div>
                  </div>
                  <Link href="/contact" className="rsvp-btn">RSVP</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student success */}
      <section style={{ background: "var(--ink)", padding: "0 clamp(20px,4vw,44px) 110px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "var(--a2)", marginBottom: 12 }}>FROM THE COMMUNITY</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(28px,3.4vw,42px)", color: "#fff", letterSpacing: "-0.025em" }}>Student success stories</h2>
          </div>
          <div className="grid-3">
            {COMMUNITY_TESTIMONIALS.map((q) => (
              <Testimonial key={q.name} {...q} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
