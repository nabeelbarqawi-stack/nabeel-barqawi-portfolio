// Placeholder pricing/copy — edit freely, no other file needs to change.
export type ProgramSlug = "single-session" | "five-week-program" | "corporate-workshop";

export type Track = { title: string; description: string };

export type Program = {
  slug: ProgramSlug;
  name: string;
  tagline: string;
  description: string;
  whoItsFor: string;
  tracks?: Track[];
  priceCents: number | null; // null = no fixed price; invoice amount entered manually
  currency: string;
  ctaLabel: string;
  capacityTracked: boolean;
};

export const PROGRAMS: Record<ProgramSlug, Program> = {
  "single-session": {
    slug: "single-session",
    name: "Single Session",
    tagline: "One problem, one hour, a plan you can act on.",
    description:
      "A 60-minute working session on one specific thing — a positioning question, a portfolio review, an AI-adoption decision, or just getting fluent enough in AI to stop feeling behind. No curriculum, no ramp-up. You bring the problem, we leave with a plan.",
    whoItsFor: "For people who know exactly what they're stuck on and want it unstuck this week.",
    priceCents: 15000, // $150 placeholder
    currency: "usd",
    ctaLabel: "Book a session",
    capacityTracked: false,
  },
  "five-week-program": {
    slug: "five-week-program",
    name: "5-Week Program",
    tagline: "Five weeks. One outcome, picked by you.",
    description:
      "Five weeks, five sessions, one track. Pick the outcome that matches where you're stuck, and every session builds toward it — not a generic curriculum.",
    whoItsFor: "For people ready to commit real time to one specific change.",
    tracks: [
      {
        title: "Break into product",
        description: "For engineers and operators making the jump into product — frameworks that actually translate.",
      },
      {
        title: "AI for your team",
        description: "Get your own team shipping with AI — working sessions, not just theory.",
      },
      {
        title: "Reposition your career",
        description: "Positioning, portfolio, interviews, and a real plan for the next 12 months.",
      },
    ],
    priceCents: 60000, // $600 placeholder
    currency: "usd",
    ctaLabel: "Reserve your spot",
    capacityTracked: true,
  },
  "corporate-workshop": {
    slug: "corporate-workshop",
    name: "Corporate Workshop",
    tagline: "Your team, shipping with AI — in a day, not a quarter.",
    description:
      "A half-day or full-day session for your team, built around what you're actually building — not a generic AI 101 deck. Pricing depends on scope; let's talk.",
    whoItsFor: "For teams who need to move now, not after a training budget cycle.",
    priceCents: null,
    currency: "usd",
    ctaLabel: "Get in touch",
    capacityTracked: true,
  },
};

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS[slug as ProgramSlug];
}

export const PROGRAM_SLUGS = Object.keys(PROGRAMS) as ProgramSlug[];
