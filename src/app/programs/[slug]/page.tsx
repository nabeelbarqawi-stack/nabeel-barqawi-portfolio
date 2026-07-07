import { notFound } from "next/navigation";
import { getProgram, PROGRAM_SLUGS } from "@/lib/programs";
import { getOpenCohort } from "@/lib/supabase-admin";
import ProgramSignupForm from "@/components/ProgramSignupForm";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return PROGRAM_SLUGS.map((slug) => ({ slug }));
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const cohort = program.capacityTracked ? await getOpenCohort(program.slug) : null;

  return (
    <>
      <Nav />
      <main id="main-content" className="section" style={{ paddingTop: 160 }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> {program.name}
          </div>

          <h1 className="section-title" style={{ marginTop: 24 }}>{program.tagline}</h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--fg-dim)", marginTop: 24 }}>
            {program.description}
          </p>

          {program.priceCents && (
            <p style={{ fontSize: 20, fontWeight: 600, marginTop: 24 }}>
              ${(program.priceCents / 100).toFixed(0)}
            </p>
          )}

          {cohort && (
            <p style={{ fontSize: 14, color: "var(--fg-dim)", marginTop: 8 }}>
              {cohort.label} — {Math.max(cohort.capacity - cohort.seats_taken, 0)} of {cohort.capacity} spots left
            </p>
          )}

          <div style={{ marginTop: 48 }}>
            <ProgramSignupForm slug={program.slug} ctaLabel={program.ctaLabel} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
