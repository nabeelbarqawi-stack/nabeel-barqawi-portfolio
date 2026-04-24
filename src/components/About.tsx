"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-16 lg:px-24 py-28 border-t border-[rgba(255,255,255,0.06)]"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-24 items-start">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="md:w-48 shrink-0"
        >
          <span className="text-xs font-medium tracking-[0.2em] text-[#E6A04B] uppercase">
            About
          </span>
        </motion.div>

        {/* Content */}
        <div className="flex-1 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-[-0.02em] text-[#F5F5F5] mb-8 leading-tight"
          >
            Non-linear path.
            <br />
            Clear direction.
          </motion.h2>

          <div className="space-y-5">
            {[
              "My path wasn't straight. And that's exactly why the work is better.",
              "I'm Arab American — comfortable with ambiguity, built for navigating between worlds. I've learned to hold complexity without losing sight of what matters.",
              "I don't follow defaults. I think from first principles, ask uncomfortable questions, and push toward outcomes that are actually useful.",
              "The through-line across everything I've done: making complex things clear — for teams, for users, for leaders trying to move forward.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="text-[1rem] font-light leading-relaxed text-[#F5F5F5]/55"
              >
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
