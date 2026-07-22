// All site content, ported from the Claude Design handoff.

export const CONTACT = {
  email: "nabeelbarqawi@gmail.com",
  linkedin: "https://linkedin.com/in/nabeelbarqawi",
  github: "https://github.com/nabeelbarqawi-stack",
};

export type NavChild = { label: string; desc: string; href: string };
export type NavGroup = {
  id: string;
  label: string;
  href: string;
  children?: NavChild[];
  /** routes that light up this group as active */
  match: string[];
};

export const NAV_GROUPS: NavGroup[] = [
  { id: "home", label: "Home", href: "/", match: ["/"] },
  { id: "about", label: "About", href: "/about", match: ["/about"] },
  {
    id: "services",
    label: "Services",
    href: "/services",
    match: ["/services", "/coaching", "/speaking"],
    children: [
      { label: "All Services", desc: "Four ways to work together", href: "/services" },
      { label: "Coaching", desc: "1:1 product & AI coaching", href: "/coaching" },
      { label: "Speaking", desc: "Talks, keynotes & workshops", href: "/speaking" },
    ],
  },
  {
    id: "community",
    label: "Community",
    href: "/community",
    match: ["/community", "/resources"],
    children: [
      { label: "Community Hub", desc: "Events, office hours & more", href: "/community" },
      { label: "Resources", desc: "Articles, guides & templates", href: "/resources" },
    ],
  },
];

export const FOOTER_NAV: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Speaking", href: "/speaking" },
  { label: "Coaching", href: "/coaching" },
  { label: "Community", href: "/community" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

// Logos are the real files uploaded into the design, in the original display order.
export const BRANDS: { id: string; name: string; src?: string }[] = [
  { id: "liberty", name: "Liberty Mutual", src: "/logos/liberty.png" },
  { id: "stripe", name: "Stripe", src: "/logos/stripe.png" },
  { id: "carmax", name: "CarMax", src: "/logos/carmax.png" },
  { id: "disney", name: "Disney", src: "/logos/disney.png" },
  { id: "bread", name: "Bread Financial", src: "/logos/bread.png" },
  { id: "prounitas", name: "ProUnitas", src: "/logos/prounitas.png" },
];

export const FEATURED_SERVICES = [
  { icon: "CO", name: "1:1 Coaching", blurb: "A 1:1 partnership to grow into the product leader you’re becoming." },
  { icon: "PA", name: "Product & AI Consulting", blurb: "Turn AI ambition into shipped products with a clear, production-ready strategy." },
  { icon: "WS", name: "Corporate PM & AI Workshops", blurb: "Hands-on workshops that make your team confident, practical PM and AI practitioners." },
];

export const COMMUNITY_STATS = [
  { num: "500+", label: "professionals taught" },
  { num: "12", label: "workshops & cohorts run" },
  { num: "Free", label: "30 min call" },
];

export const HOME_TALKS = [
  { slot: "home-talk-1", event: "Liberty Mutual · Leadership Session", title: "Reimagining an AI-powered product lifecycle", src: "/photos/audience-qa.jpg" },
  { slot: "home-talk-2", event: "BrainStation", title: "Making AI accessible: from theory to hands-on", src: "/photos/community-chat.jpg" },
];

export const HOME_TESTIMONIALS = [
  { quote: "One of the most valuable learning experiences I’ve had. He makes complex AI feel accessible and intuitive.", name: "Austen Lazarus", role: "Staff Research PM, ServiceNow", initials: "AL" },
  { quote: "Led our leadership through an innovative, inspiring session and left our team excited for the future.", name: "Kira Wakefield", role: "VP, Liberty Mutual", initials: "KW" },
  { quote: "Deep understanding of the AI landscape, translating complex methodologies into clear, actionable insights.", name: "Melissa Hatter", role: "Head of Enterprise CS, Americas", initials: "MH" },
];

export const HOME_RESOURCES = [
  { type: "ARTICLE", cat: "AI PRODUCT", title: "The AI PM stack: what actually ships" },
  { type: "TEMPLATE", cat: "PRODUCT", title: "AI feature PRD template (free)" },
  { type: "VIDEO", cat: "CAREER", title: "Breaking into AI product management" },
];

export const JOURNEY = [
  { icon: "1", era: "THE BEGINNING", title: "Finding my way into product", body: "I started as someone obsessed with why things work the way they do. Product management gave me a home, the intersection of people, technology, and real problems worth solving." },
  { icon: "2", era: "BUILDING AI PRODUCTS", title: "From features to intelligent experiences", body: "I moved deep into AI, learning to translate messy, cutting-edge technology into products people trust. Data, experimentation, and a bias for shipping became my toolkit." },
  { icon: "3", era: "DISNEY", title: "Leading Conversational AI", body: "At Disney I lead Conversational AI, building Ai Agent experiences at scale, measuring satisfaction obsessively, and proving that great AI is invisible when it just works." },
  { icon: "4", era: "TEACHING", title: "Educator & speaker", body: "Teaching Product Management and AI, I found the work I love most: helping people understand AI, and watching them get excited about the future." },
  { icon: "5", era: "TODAY", title: "Coaching & community", body: "Now I coach product leaders and build a community of AI builders, because the technology only matters if the people around it grow with it." },
];

export const VALUES = [
  { title: "Human first", body: "Technology should make people more capable, not more anxious. I lead with empathy, for teams, users, and learners." },
  { title: "Learn in the open", body: "I share what I know freely. A rising tide lifts everyone, and the best ideas come from a community learning together." },
  { title: "Build for impact", body: "Not features for their own sake. I measure success by outcomes, satisfaction, and the growth of the people I work with." },
];

export type Service = {
  picon: "handshake" | "brain" | "presentation-chart" | "microphone-stage";
  name: string; blurb: string; who: string; solves: string; outcomes: string; process: string; cta: string;
  book?: "cal"; // if set, the CTA opens the Cal.com booking modal instead of the contact drawer
};

export const SERVICES: Service[] = [
  { picon: "handshake", name: "1:1 Coaching", blurb: "A structured, human 1:1 partnership to grow into the product leader you’re becoming.", who: "PMs and aspiring AI product leaders.", solves: "Career plateaus, imposter syndrome, missing frameworks.", outcomes: "Confidence, real frameworks, and measurable career momentum.", process: "Assess → Plan → Weekly 1:1s → Accountability.", cta: "Book a coaching call", book: "cal" },
  { picon: "brain", name: "Product & AI Consulting", blurb: "Hands-on help turning AI ambition into production-ready products your customers actually use.", who: "Teams shipping (or stuck shipping) AI-powered features.", solves: "Vague AI strategy, POCs that never reach production, unclear ROI.", outcomes: "A prioritized, production-ready roadmap and an enabled team.", process: "Audit → Strategy → Roadmap → Enablement.", cta: "Start a project" },
  { picon: "presentation-chart", name: "Corporate PM & AI Workshops", blurb: "High-energy, hands-on workshops that turn your team into confident, practical product and AI practitioners.", who: "Enterprise teams leveling up their product and AI craft.", solves: "AI hype without know-how, weak product fundamentals, no shared vocabulary.", outcomes: "A team that leaves with concrete PM and AI tools to apply now.", process: "Scope → Customize → Facilitate → Follow-up.", cta: "Plan a workshop" },
  { picon: "microphone-stage", name: "Speaking Engagements", blurb: "Keynotes and sessions that leave rooms energized about AI and the future of work.", who: "Conferences, leadership offsites, and internal events.", solves: "Flat agendas, abstract AI talk, low engagement.", outcomes: "An inspired audience with a practical, hopeful view of AI.", process: "Brief → Tailor → Deliver → Q&A.", cta: "Book me to speak" },
];

export const TOPICS = [
  "The future of AI & work",
  "AI-powered product management",
  "Building conversational AI at scale",
  "Adopting AI in the enterprise",
  "From PM to AI product leader",
  "Human-centered AI",
];

export const TALKS = [
  { tag: "UPCOMING", accent: true, title: "AI product management in practice", event: "Product Leaders Summit", date: "Sep 2026" },
  { tag: "KEYNOTE", accent: false, title: "Reimagining the product lifecycle with AI", event: "Liberty Mutual Leadership", date: "Mar 2026" },
  { tag: "WORKSHOP", accent: false, title: "Practical AI for enterprise teams", event: "BrainStation", date: "Apr 2026" },
  { tag: "PANEL", accent: false, title: "The next decade of conversational AI", event: "Industry Panel", date: "Feb 2026" },
];

export const COACHING_FOR = [
  "PMs who want to move into AI product roles",
  "New product leaders finding their footing",
  "Senior ICs preparing for their next level",
  "Career-changers breaking into product",
];

export const CURRICULUM = [
  { n: "01", title: "Foundations & positioning", body: "Where you are, where you’re going, and the gap to close." },
  { n: "02", title: "AI product fluency", body: "The concepts and vocabulary to lead AI work with confidence." },
  { n: "03", title: "Frameworks that stick", body: "Strategy, discovery, and prioritization you’ll actually use." },
  { n: "04", title: "Story & influence", body: "Communicating, presenting, and leading without authority." },
];

export const COACHING_TESTIMONIALS = [
  { quote: "Having recently been Nabeel’s student, I can highly recommend him as both an educator and an AI industry expert. He balances current enterprise use cases with visionary insight.", name: "Melissa Hatter", role: "Head of Enterprise CS, Americas", initials: "MH" },
  { quote: "If you’re looking for an instructor who truly knows their subject and can communicate it with clarity and patience, Nabeel is your person.", name: "Austen Lazarus", role: "Staff Research PM, ServiceNow", initials: "AL" },
];

export const FAQS = [
  { q: "Who is coaching for?", a: "PMs and aspiring AI product leaders, whether you’re breaking in, leveling up, or navigating a transition." },
  { q: "How is it structured?", a: "A short assessment, a personalized plan, then weekly or biweekly 1:1 sessions with accountability between calls." },
  { q: "How long is a typical engagement?", a: "Most people work with me for 3–6 months, long enough to build real momentum and habits." },
  { q: "How do I get started?", a: "Book an intro call. We’ll talk about your goals and see if it’s the right fit, no pressure." },
];

export const COMMUNITY_AREAS = [
  { badge: "EVENTS", title: "Upcoming events", body: "Live sessions, AMAs, and meetups where the community learns together." },
  { badge: "WORKSHOPS", title: "Hands-on workshops", body: "Practical, build-along sessions on AI and product craft." },
  { badge: "NEWSLETTER", title: "The newsletter", body: "AI + product insights and resources, delivered to your inbox." },
  { badge: "FREE RESOURCES", title: "AI & PM resources", body: "Templates, guides, and downloads, all free, always." },
  { badge: "FREE CALL", title: "Free 30 min call", body: "Book a free 30 minute call to talk through your questions, one on one." },
  { badge: "COMING SOON", title: "Discord / Slack", body: "A dedicated space for members to connect, share, and grow together." },
];

export const EVENTS = [
  { title: "Office Hours: AI product Q&A", kind: "Live", place: "Zoom" },
  { title: "Workshop: Build an AI feature PRD", kind: "Workshop", place: "Online" },
  { title: "AMA: Breaking into AI product", kind: "Community", place: "Discord" },
  { title: "Meetup: Future of work + AI", kind: "In person", place: "NYC" },
];

export const COMMUNITY_TESTIMONIALS = [
  { quote: "The session struck the perfect balance between foundational theory and hands-on applications, we left with concrete ideas and tools to start applying right away.", name: "Ayesha T. Khan", role: "Digital Strategy & Experience", initials: "AK" },
  { quote: "Presentation skills are outstanding, he keeps his audience engaged with energy and meaningful, practical content.", name: "Darwin Castaneda", role: "Global Product Officer, Liberty Mutual", initials: "DC" },
  { quote: "Fostering a culture of learning, development, and growth for everyone on the team, refreshing energy and the ability to inspire others.", name: "Nadia Hassan", role: "Senior Technology Leader", initials: "NH" },
];

export const RESOURCE_FILTERS = ["All", "Articles", "AI tutorials", "PM guides", "Videos", "Podcasts", "Templates"];

export const RESOURCES = [
  { type: "ARTICLE", cat: "AI PRODUCT", title: "The AI PM stack: what actually ships", desc: "A field guide to the tools, workflows, and decisions behind shipped AI." },
  { type: "TUTORIAL", cat: "AI TUTORIAL", title: "Prototyping with LLMs in an afternoon", desc: "Go from idea to working prototype without an engineering team." },
  { type: "GUIDE", cat: "PM GUIDE", title: "The complete AI product discovery guide", desc: "How to find, validate, and scope AI opportunities worth building." },
  { type: "TEMPLATE", cat: "TEMPLATE", title: "AI feature PRD template", desc: "The exact template I use to spec AI features. Free to copy." },
  { type: "VIDEO", cat: "VIDEO", title: "Breaking into AI product management", desc: "A candid talk on the path from PM to AI product leader." },
  { type: "PODCAST", cat: "PODCAST", title: "On building trustworthy AI", desc: "A conversation about human-centered AI and the future of work." },
];

export type ContactCard = { icon: string; title: string; body: string; action: string; kind: "cal" | "mailto" | "link" | "drawer"; href?: string };

export const CONTACT_CARDS: ContactCard[] = [
  { icon: "C", title: "Book a coaching call", body: "1:1 coaching for PMs and aspiring AI product leaders. Let’s talk about your goals.", action: "Schedule a call", kind: "cal" },
  { icon: "B", title: "Business inquiries", body: "Consulting, workshops, fractional leadership, tell me about your team and challenge.", action: "Start the conversation", kind: "drawer" },
  { icon: "S", title: "Speaking requests", body: "Bring an energizing, practical AI talk to your event or leadership team.", action: "Request a talk", kind: "drawer" },
  { icon: "in", title: "LinkedIn", body: "Follow along, say hi, and see what the community is building day to day.", action: "Connect on LinkedIn", kind: "link", href: CONTACT.linkedin },
];
