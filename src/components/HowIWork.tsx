"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    title: "Clarity over noise",
    desc: "Turns ambiguity into structured direction",
  },
  {
    title: "Human + technical",
    desc: "Bridges systems with real user behavior",
  },
  {
    title: "Execution with intent",
    desc: "Focuses on outcomes, not output",
  },
  {
    title: "Collaborative by design",
    desc: "Aligns teams and drives progress",
  },
];

export default function HowIWork() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-16 lg:px-24 py-28 border-t border-[rgba(255,255,255,0.06)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-24 mb-16 items-start">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="md:w-48 shrink-0"
          >
            <span className="text-xs font-medium tracking-[0.2em] text-[#E6A04B] uppercase">
              How I Work
            </span>
          </motion.div>

          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-[#F5F5F5] mb-5"
            >
              I focus on clarity.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[1.05rem] font-light leading-relaxed text-[#F5F5F5]/55 max-w-2xl"
            >
              In complex systems, most problems aren&apos;t technical — they&apos;re unclear.
              I break things down to first principles, align teams, and move toward outcomes
              that actually work.
            </motion.p>
          </div>
        </div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden">
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
              className="bg-[#0B0B0C] p-8 group hover:bg-[#111113] transition-colors duration-300"
            >
              <div className="amber-dot mb-5" />
              <h3 className="text-base font-semibold text-[#F5F5F5] mb-3 leading-snug">
                {p.title}
              </h3>
              <p className="text-sm font-light text-[#F5F5F5]/45 leading-relaxed">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
