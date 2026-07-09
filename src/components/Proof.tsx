"use client";

import Reveal from "./Reveal";

const companies = ["BrainStation", "ServiceNow", "Liberty Mutual"];

const testimonials = [
  {
    quote:
      "Having recently been Nabeel's student, I can highly recommend him as both an educator and an AI industry expert. He possesses a deep understanding of the AI landscape, translating complex methodologies into clear, actionable insights. His curriculum masterfully balanced current enterprise use cases with visionary insights into the future impact of AI.",
    name: "Melissa Hatter",
    role: "Head of Enterprise Customer Success, The Americas",
  },
  {
    quote:
      "I recently took an AI course at BrainStation with Nabeel as my instructor, and I can genuinely say it was one of the most valuable learning experiences I've had. Nabeel takes complex AI concepts and makes them feel accessible and intuitive through hands-on learning.",
    name: "Austen Lazarus",
    role: "Staff Research Program Manager, ServiceNow",
  },
  {
    quote:
      "Nabeel led our leadership through an innovative and inspiring session, reimagining an AI-powered product management lifecycle. His energy and approach was highly engaging, leaving our team excited for the future.",
    name: "Kira Wakefield",
    role: "VP, Business Agility Strategy & Operations, Liberty Mutual Insurance",
  },
  {
    quote:
      "The session struck the perfect balance between foundational theory and hands-on, practical applications. What stood out most was how actionable it was — we left with concrete ideas and tools we could start applying right away.",
    name: "Ayesha T. Khan",
    role: "Digital Strategy & Experience",
  },
];

export default function Proof() {
  return (
    <section className="section" style={{ borderTop: "1px solid var(--hairline)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">
            <span className="eyebrow-dot" /> 06 — In their words
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="section-title" style={{ marginTop: 32, maxWidth: 700 }}>
            Trusted by the people I&apos;ve worked with.
          </h2>
        </Reveal>

        <div className="testimonial-grid" style={{ marginTop: 56 }}>
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} y={20}>
              <figure className="testimonial-card">
                <span className="testimonial-mark" aria-hidden="true">&ldquo;</span>
                <blockquote className="testimonial-quote">{t.quote}</blockquote>
                <figcaption>
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-role">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={420}>
          <div className="companies-strip">
            <span className="companies-label">Taught &amp; advised teams at</span>
            <div className="companies-list">
              {companies.map((c) => (
                <span key={c} className="companies-name">{c}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
