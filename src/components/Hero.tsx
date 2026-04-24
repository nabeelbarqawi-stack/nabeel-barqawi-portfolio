"use client";

import { motion } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(230,160,75,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 md:px-16 lg:px-24 py-8"
      >
        <span className="text-sm font-medium tracking-widest text-[#F5F5F5]/60 uppercase">
          Nabeel Barqawi
        </span>
        <a
          href="mailto:nabeelbarqawi@gmail.com"
          className="text-sm text-[#F5F5F5]/40 hover:text-[#E6A04B] transition-colors duration-300"
        >
          nabeelbarqawi@gmail.com
        </a>
      </motion.nav>

      {/* Hero content */}
      <div className="relative max-w-5xl pt-24 md:pt-0">
        {/* Eyebrow */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex items-center gap-3 mb-8"
        >
          <span className="amber-dot" />
          <span className="text-xs font-medium tracking-[0.2em] text-[#E6A04B] uppercase">
            Product &amp; AI
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-[clamp(2.8rem,7vw,6.5rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-[#F5F5F5] mb-6"
        >
          Making complex
          <br />
          systems simple.
        </motion.h1>

        {/* Subline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-[clamp(1rem,2vw,1.35rem)] font-light text-[#F5F5F5]/55 tracking-wide mb-3"
        >
          AI-powered.&nbsp; Human-centered.&nbsp; Product-driven.
        </motion.p>

        {/* Supporting line */}
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-base text-[#F5F5F5]/30 mb-14"
        >
          I build products and experiences used by millions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row gap-4 items-start"
        >
          {/* Primary */}
          <a
            href="mailto:nabeelbarqawi@gmail.com?subject=Hiring%20Inquiry"
            className="group relative inline-flex items-center gap-2 bg-[#E6A04B] text-[#0B0B0C] text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#f0b060] transition-colors duration-200"
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
            className="inline-flex items-center gap-2 border border-[#F5F5F5]/12 text-[#F5F5F5]/70 text-sm font-medium px-7 py-3.5 rounded-full hover:border-[#E6A04B]/40 hover:text-[#F5F5F5] transition-all duration-200"
          >
            Book 1:1 coaching
          </a>

          {/* Tertiary */}
          <a
            href="mailto:nabeelbarqawi@gmail.com"
            className="inline-flex items-center gap-2 text-[#F5F5F5]/35 text-sm font-medium px-4 py-3.5 hover:text-[#E6A04B] transition-colors duration-200"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-transparent via-[#F5F5F5]/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
