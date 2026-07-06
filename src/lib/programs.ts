// Placeholder pricing/copy — edit freely, no other file needs to change.
export type ProgramSlug = "single-session" | "five-week-program" | "corporate-workshop";

export type Program = {
  slug: ProgramSlug;
  name: string;
  tagline: string;
  description: string;
  priceCents: number | null; // null = no fixed price (contact for quote)
  currency: string;
  paymentMethod: "stripe" | "contact";
  capacityTracked: boolean;
};

export const PROGRAMS: Record<ProgramSlug, Program> = {
  "single-session": {
    slug: "single-session",
    name: "Single Session",
    tagline: "One focused hour, real output.",
    description:
      "A single 60-minute working session — bring a specific problem (positioning, a portfolio review, an AI-adoption question) and leave with a concrete plan.",
    priceCents: 15000, // $150 placeholder
    currency: "usd",
    paymentMethod: "stripe",
    capacityTracked: false,
  },
  "five-week-program": {
    slug: "five-week-program",
    name: "5-Week Program",
    tagline: "A structured sprint from confusion to clarity.",
    description:
      "Five weeks, five sessions, one outcome — whether that's breaking into product, standing up an AI workflow for your team, or repositioning your career.",
    priceCents: 60000, // $600 placeholder
    currency: "usd",
    paymentMethod: "stripe",
    capacityTracked: true,
  },
  "corporate-workshop": {
    slug: "corporate-workshop",
    name: "Corporate Workshop",
    tagline: "Get your team shipping with AI.",
    description:
      "A half-day or full-day workshop for your team — hands-on, practical, and tailored to what you're actually building. Pricing depends on scope; let's talk.",
    priceCents: null,
    currency: "usd",
    paymentMethod: "contact",
    capacityTracked: true,
  },
};

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS[slug as ProgramSlug];
}

export const PROGRAM_SLUGS = Object.keys(PROGRAMS) as ProgramSlug[];
