"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    title: "Break Into Product",
    outcome:
      "Go from wherever you are to a product role with real leverage — without waiting for permission.",
  },
  {
    title: "AI for Teams",
    outcome:
      "Bring AI into your org in a way that actually works — aligned to real problems, not hype.",
  },
  {
    title: "Learn AI (Practical)",
    outcome:
      "Build a clear mental model of AI — so you can use it to think, build, and lead more effectively.",
  },
  {
    title: "Career Coaching",
    outcome:
      "Clarify your direction, sharpen your positioning, and move faster toward what you actually want.",
  },
];

export default function WhatIDo() {
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
              What I Do
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-[#F5F5F5]"
          >
            Outcomes, not tasks.
          </motion.h2>
        </div>

        {/* Service list */}
        <div className="flex flex-col divide-y divide-[rgba(255,255,255,0.06)]">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 py-7 group"
            >
              <div className="flex items-center gap-4 md:w-72 shrink-0">
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                  className="amber-dot"
                />
                <h3 className="text-base font-semibold text-[#F5F5F5] group-hover:text-[#E6A04B] transition-colors duration-300">
                  {s.title}
                </h3>
              </div>
              <p className="text-sm font-light text-[#F5F5F5]/45 leading-relaxed">
                {s.outcome}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
