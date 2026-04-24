"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const statements = [
  "Pluralist by nature. Contrarian in training.",
  "Curious enough to explore anyway.",
  "Focused on first principles, not defaults.",
  "Building things that solve real human problems.",
];

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-16 lg:px-24 py-28 border-t border-[rgba(255,255,255,0.06)]"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="md:w-48 shrink-0"
        >
          <span className="text-xs font-medium tracking-[0.2em] text-[#E6A04B] uppercase">
            Philosophy
          </span>
        </motion.div>

        {/* Statements */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
          {statements.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex items-start gap-4"
            >
              <span className="amber-dot mt-2" />
              <p className="text-[1.05rem] font-light leading-relaxed text-[#F5F5F5]/70">
                {s}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
