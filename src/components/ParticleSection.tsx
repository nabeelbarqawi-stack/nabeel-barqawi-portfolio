"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

export default function ParticleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        paddingTop: "clamp(32px, 5vw, 48px)",
        paddingBottom: "clamp(32px, 5vw, 48px)",
        borderTop: "1px solid var(--hairline)",
        overflow: "hidden",
      }}
    >
      {/* Vignette overlay */}
      <div
        aria-hidden
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          zIndex: 10,
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, #F2F1EE 100%)",
        }}
      />

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          zIndex: 20,
          textAlign: "center",
          marginBottom: "clamp(20px, 4vw, 32px)",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--fg-dimmer)",
          }}
        >
          From complexity to clarity
        </span>
      </motion.div>

      {/* Canvas container — height scales with viewport on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3 }}
        style={{
          position: "relative",
          zIndex: 0,
          width: "100%",
          height: "clamp(140px, 28vw, 220px)",
        }}
      >
        <ParticleCanvas />
      </motion.div>
    </section>
  );
}
