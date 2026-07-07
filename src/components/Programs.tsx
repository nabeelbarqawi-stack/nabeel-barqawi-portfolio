import Link from "next/link";
import Reveal from "./Reveal";
import { PROGRAMS, PROGRAM_SLUGS } from "@/lib/programs";
import { getOpenCohort } from "@/lib/supabase-admin";

async function getCapacityLabel(slug: string, capacityTracked: boolean) {
  if (!capacityTracked) return { label: "Open enrollment", full: false };

  const cohort = await getOpenCohort(slug);
  if (!cohort) return { label: "Waitlist", full: true };

  const remaining = cohort.capacity - cohort.seats_taken;
  if (remaining <= 0) return { label: "Full — join waitlist", full: true };
  return { label: `${remaining} of ${cohort.capacity} spots left`, full: false };
}

const faqs = [
  {
    q: "How is this different from a course or a book?",
    a: "A course teaches everyone the same thing. Here, every session is built around your specific situation — what you're actually stuck on, not a generic syllabus.",
  },
  {
    q: "What if I'm not sure which one fits?",
    a: "Start with a Single Session. It's low-commitment, and by the end we'll both know if the 5-Week Program is the right next step.",
  },
  {
    q: "Do you work with people outside product/AI?",
    a: "Most of my clients are engineers, PMs, and operators — but the method (get specific, cut the noise, ship) applies anywhere the problem is more ambiguous than technical.",
  },
];

export default async function Programs({ compact = false }: { compact?: boolean }) {
  const cards = await Promise.all(
    PROGRAM_SLUGS.map(async (slug) => {
      const program = PROGRAMS[slug];
      const capacity = await getCapacityLabel(slug, program.capacityTracked);
      return { program, capacity };
    })
  );

  if (compact) {
    return (
      <section id="programs" className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow">
              <span className="eyebrow-dot" /> Work with me
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="section-title" style={{ marginTop: 32, maxWidth: 900 }}>
              Three ways to get started.
            </h2>
          </Reveal>

          <div className="programs-grid" style={{ marginTop: 56 }}>
            {cards.map(({ program, capacity }, i) => (
              <Reveal key={program.slug} delay={i * 80} y={20}>
                <div className="program-card program-card--compact">
                  <div className={`program-capacity ${capacity.full ? "full" : ""}`}>{capacity.label}</div>
                  <div className="program-name">{program.name}</div>
                  <div className="program-tagline">{program.tagline}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240}>
            <Link href="/programs" className="btn btn--primary" style={{ marginTop: 40, display: "inline-flex" }}>
              See all programs
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 6 }}>
                <path d="M3 6 H9 M6 3 L9 6 L6 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="programs" className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container">
          <Reveal>
            <div className="eyebrow">
              <span className="eyebrow-dot" /> Work with me
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="section-title" style={{ marginTop: 32, maxWidth: 900 }}>
              Pick the outcome, not the format.
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="section-body" style={{ marginTop: 24, maxWidth: 640 }}>
              Every program below ends in the same thing: a specific problem, solved. The difference is how much time you want to spend getting there.
            </p>
          </Reveal>

          <div className="programs-grid programs-grid--detailed" style={{ marginTop: 64 }}>
            {cards.map(({ program, capacity }, i) => (
              <Reveal key={program.slug} delay={i * 80} y={20}>
                <div className="program-card program-card--detailed">
                  <div className={`program-capacity ${capacity.full ? "full" : ""}`}>{capacity.label}</div>
                  <div className="program-name">{program.name}</div>
                  <div className="program-tagline">{program.tagline}</div>
                  <div className="program-desc">{program.description}</div>
                  <div className="program-who">{program.whoItsFor}</div>

                  {program.tracks && (
                    <ul className="program-tracks">
                      {program.tracks.map((track) => (
                        <li key={track.title}>
                          <strong>{track.title}</strong>
                          <span>{track.description}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {program.priceCents && (
                    <div className="program-price">${(program.priceCents / 100).toFixed(0)}</div>
                  )}

                  <Link href={`/programs/${program.slug}`} className="btn btn--primary btn--full" style={{ marginTop: "auto" }}>
                    {program.ctaLabel}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <Reveal>
            <div className="eyebrow">
              <span className="eyebrow-dot" /> Questions
            </div>
          </Reveal>

          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 32 }}>
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 80} y={16}>
                <div style={{ borderBottom: i < faqs.length - 1 ? "1px solid var(--hairline)" : "none", paddingBottom: 32 }}>
                  <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, fontFamily: "var(--font-display)" }}>{faq.q}</div>
                  <div style={{ fontSize: 15, lineHeight: 1.6, color: "var(--fg-dim)" }}>{faq.a}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
