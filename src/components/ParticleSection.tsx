"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

export default function ParticleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      className="relative py-20 border-t border-[rgba(255,255,255,0.06)] overflow-hidden"
    >
      {/* Vignette overlay for cinematic feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, #0B0B0C 100%)",
        }}
      />

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center mb-8"
      >
        <span className="text-xs font-medium tracking-[0.25em] text-[#F5F5F5]/25 uppercase">
          From complexity to clarity
        </span>
      </motion.div>

      {/* Canvas container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative z-0 w-full"
        style={{ height: "340px" }}
      >
        <ParticleCanvas />
      </motion.div>
    </section>
  );
}
