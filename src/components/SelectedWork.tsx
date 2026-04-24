"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface CaseStudy {
  company: string;
  title: string;
  description: string;
  tags: string[];
  metrics: { value: string; label: string }[];
}

const cases: CaseStudy[] = [
  {
    company: "Disney",
    title: "AI Agent — Disney",
    description:
      "AI-powered virtual assistant serving tens of millions of customers across Disney's digital ecosystem. Designed to handle the full service journey — from discovery to resolution — at massive scale.",
    tags: ["Conversational AI", "Enterprise", "Product Strategy"],
    metrics: [
      { value: "2M+", label: "Monthly users" },
      { value: "2.8%", label: "Conversion rate" },
      { value: "~97%", label: "Containment" },
    ],
  },
  {
    company: "CarMax",
    title: "AI Agent — CarMax",
    description:
      "End-to-end conversational AI spanning web and SMS channels, transforming how millions of car buyers interact with CarMax — from initial inquiry through purchase decisions.",
    tags: ["Conversational AI", "Omnichannel", "Automation"],
    metrics: [
      { value: "40%", label: "Containment rate" },
      { value: "$5M+", label: "Cost savings" },
      { value: "+16%", label: "Automation lift" },
    ],
  },
];

function CaseStudyPanel({ study, index }: { study: CaseStudy; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col justify-between bg-[#111113] border border-[rgba(255,255,255,0.06)] rounded-2xl p-8 md:p-10 overflow-hidden cursor-default"
    >
      {/* Hover glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(230,160,75,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Top: company tag + title */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-medium tracking-[0.18em] text-[#E6A04B] uppercase">
            {study.company}
          </span>
        </div>

        <h3 className="text-[clamp(1.4rem,2.5vw,2rem)] font-semibold tracking-[-0.02em] text-[#F5F5F5] mb-4 leading-tight">
          {study.title}
        </h3>

        <p className="text-[0.95rem] font-light leading-relaxed text-[#F5F5F5]/50 mb-8">
          {study.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {study.tags.map((t) => (
            <span
              key={t}
              className="text-xs font-medium px-3 py-1 rounded-full border border-[rgba(255,255,255,0.08)] text-[#F5F5F5]/40"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-[rgba(255,255,255,0.06)]">
        {study.metrics.map((m) => (
          <div key={m.label}>
            <div className="text-[clamp(1.4rem,2vw,1.8rem)] font-semibold text-[#F5F5F5] tracking-tight leading-none mb-1.5">
              {m.value}
            </div>
            <div className="text-xs text-[#F5F5F5]/35 font-light leading-relaxed">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SelectedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-16 lg:px-24 py-28 border-t border-[rgba(255,255,255,0.06)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-24 mb-14 items-start">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="md:w-48 shrink-0"
          >
            <span className="text-xs font-medium tracking-[0.2em] text-[#E6A04B] uppercase">
              Selected Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-[#F5F5F5]"
          >
            Products at scale.
          </motion.h2>
        </div>

        {/* Side-by-side panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {cases.map((study, i) => (
            <CaseStudyPanel key={study.company} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
