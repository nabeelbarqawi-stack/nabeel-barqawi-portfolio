"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative px-6 md:px-16 lg:px-24 py-32 border-t border-[rgba(255,255,255,0.06)] overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(230,160,75,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="amber-dot" />
          <span className="text-xs font-medium tracking-[0.2em] text-[#E6A04B] uppercase">
            Let&apos;s work together
          </span>
          <span className="amber-dot" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[clamp(2.2rem,5vw,4.5rem)] font-semibold tracking-[-0.03em] text-[#F5F5F5] leading-[1.06] mb-6"
        >
          Ready to make
          <br />
          something real?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[1rem] font-light text-[#F5F5F5]/40 mb-14 max-w-md mx-auto leading-relaxed"
        >
          Whether you need a product leader, an AI strategist, or someone to help you
          think clearly — let&apos;s connect.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary */}
          <a
            href="mailto:nabeelbarqawi@gmail.com?subject=Hiring%20Inquiry"
            className="group inline-flex items-center gap-2 bg-[#E6A04B] text-[#0B0B0C] text-sm font-semibold px-8 py-4 rounded-full hover:bg-[#f0b060] transition-colors duration-200"
          >
            Hire me for your team
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <path
                d="M1 7H13M13 7L8 2M13 7L8 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Secondary */}
          <a
            href="https://cal.com/nabeelbarqawi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#F5F5F5]/12 text-[#F5F5F5]/65 text-sm font-medium px-8 py-4 rounded-full hover:border-[#E6A04B]/40 hover:text-[#F5F5F5] transition-all duration-200"
          >
            Book 1:1 coaching
          </a>

          {/* Tertiary */}
          <a
            href="mailto:nabeelbarqawi@gmail.com"
            className="text-sm text-[#F5F5F5]/30 hover:text-[#E6A04B] px-4 py-4 transition-colors duration-200"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Cal embed hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 text-xs text-[#F5F5F5]/18"
        >
          Coaching sessions via Cal.com — book directly, no back-and-forth.
        </motion.p>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative mt-24 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#F5F5F5]/18"
      >
        <span>© {new Date().getFullYear()} Nabeel Barqawi</span>
        <span>Making complex systems simple.</span>
      </motion.footer>
    </section>
  );
}
