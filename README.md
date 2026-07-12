# Nabeel Barqawi — personal website

A premium, fully-navigable multi-page site (not a one-page scroller) built with
**Next.js 16 (App Router) + React 19 + TypeScript**. Rebuilt from a Claude Design
handoff — dark hero + light content hybrid, retrofuturism dialed to ~50% (soft
neon glows, glassmorphism, grid textures), on the **Ember** palette
(coral `#FF6E7F` + amber `#FFB24B`).

## Pages

`/` Home · `/about` · `/services` · `/speaking` · `/coaching` · `/community` ·
`/resources` · `/contact` — with a sticky glass nav (hover dropdowns group
Services and Community), a "Join the community" slide-in drawer, and site-wide
newsletter capture.

## Type & assets

- **Fonts** (via `next/font`): Space Grotesk (display), Manrope (body),
  Train One (name wordmark).
- **Icons**: `@phosphor-icons/react` (bold weight) — SVG components, no external
  font (keeps within the CSP).
- **Images**: the portrait and partner logos live in `public/`. Empty photo
  spots (about gallery, speaking stage, talk thumbnails) render styled
  placeholders — drop a file in `public/` and point the `<ImageFrame>` at it.

## Integrations

- **Cal.com** booking modal (`src/components/CalBookingButton.tsx`) — the Contact
  "doors" open it.
- **Formspree** (`xqewjded`) — the Join drawer and every newsletter form submit
  to it; each carries a hidden `form_type` so submissions are identifiable.
- **OpenAI ChatKit** assistant + **Vercel Analytics** (unchanged from before).

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (type-checks + prerenders all pages)
npm run start    # serve the production build
```

The ChatKit route needs `OPENAI_API_KEY` set in the environment at runtime.
