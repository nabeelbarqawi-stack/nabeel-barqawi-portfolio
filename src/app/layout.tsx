import type { Metadata } from "next";
import { Inter, Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ChatKitWidget from "@/components/ChatKitWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500"],
});

const BASE_URL = "https://www.nabeelbarqawi.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Nabeel Barqawi — Product & AI coaching",
  description:
    "I built the AI agents at Disney and CarMax that talk to millions of people a month. Now I coach the next person making that leap.",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Nabeel Barqawi — Product & AI coaching",
    description: "I built the AI agents at Disney and CarMax that talk to millions of people a month. Now I coach the next person making that leap.",
    url: BASE_URL,
    siteName: "Nabeel Barqawi",
    type: "website",
    images: [
      {
        url: "/nabeel.jpg",
        width: 1200,
        height: 630,
        alt: "Nabeel Barqawi — Product & AI coaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabeel Barqawi — Product & AI coaching",
    description: "I built the AI agents at Disney and CarMax that talk to millions of people a month. Now I coach the next person making that leap.",
    images: ["/nabeel.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nabeel Barqawi",
  url: BASE_URL,
  image: `${BASE_URL}/nabeel.jpg`,
  jobTitle: "Product & AI Leader",
  description:
    "Built AI agents at Disney and CarMax reaching millions of users. Now coaches engineers, PMs, and operators moving into product and AI roles.",
  email: "nabeelbarqawi@gmail.com",
  sameAs: [
    "https://linkedin.com/in/nabeelbarqawi",
    "https://x.com/nabeelbarqawi",
    "https://github.com/nabeelbarqawi",
    "https://nabeelbarqawi.substack.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Resource hints for third-party origins */}
        <link rel="preconnect" href="https://cdn.platform.openai.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.openai.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" style={{ background: "var(--bg)", color: "var(--fg)" }}>
        {/* Skip-to-content for keyboard / screen-reader users — shown on focus via CSS */}
        <a href="#main-content" className="skip-link">Skip to content</a>

        {children}
        <ChatKitWidget />
        <Analytics />

        {/* ChatKit web component — custom element registered by this CDN script */}
        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
