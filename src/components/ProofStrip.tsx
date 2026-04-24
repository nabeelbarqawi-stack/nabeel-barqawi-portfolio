"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const signals = [
  "Makes complex systems intuitive",
  "Brings clarity to ambiguity",
  "Trusted across teams and leadership",
  "Turns ideas into real products",
];

export default function ProofStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section
      ref={ref}
      className="relative border-t border-[rgba(255,255,255,0.06)] py-10 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 px-6"
      >
        {signals.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.6 }}
            className="flex items-center gap-3"
          >
            {i > 0 && (
              <span className="hidden sm:block w-1 h-1 rounded-full bg-[rgba(255,255,255,0.12)]" />
            )}
            <span className="text-sm font-light text-[#F5F5F5]/35 italic">{s}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
