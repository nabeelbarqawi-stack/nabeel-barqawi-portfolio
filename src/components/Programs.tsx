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

export default async function Programs() {
  const cards = await Promise.all(
    PROGRAM_SLUGS.map(async (slug) => {
      const program = PROGRAMS[slug];
      const capacity = await getCapacityLabel(slug, program.capacityTracked);
      return { program, capacity };
    })
  );

  return (
    <section id="programs" className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> 05 — Work with me
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="section-title" style={{ marginTop: 32, maxWidth: 900 }}>
            Three ways to get started.
          </h2>
        </Reveal>

        <div className="programs-grid" style={{ marginTop: 64 }}>
          {cards.map(({ program, capacity }, i) => (
            <Reveal key={program.slug} delay={i * 80} y={20}>
              <div className="program-card">
                <div className={`program-capacity ${capacity.full ? "full" : ""}`}>{capacity.label}</div>
                <div className="program-name">{program.name}</div>
                <div className="program-tagline">{program.tagline}</div>
                <div className="program-desc">{program.description}</div>
                <Link href={`/programs/${program.slug}`} className="service-cta">
                  <span>{program.paymentMethod === "stripe" ? "Sign up" : "Get in touch"}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6 H9 M6 3 L9 6 L6 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
