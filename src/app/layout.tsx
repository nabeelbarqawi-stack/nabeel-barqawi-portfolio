import type { Metadata } from "next";
import { Space_Grotesk, Manrope, Train_One } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});
const trainOne = Train_One({
  subsets: ["latin"],
  variable: "--font-train-one",
  display: "swap",
  weight: "400",
});

const BASE_URL = "https://www.nabeelbarqawi.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Nabeel Barqawi — Product Leader, AI Builder, Educator",
  description:
    "I help teams ship AI products that matter, and help people build the careers to lead them. Product leadership, hands-on AI education, and a growing community of builders.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Nabeel Barqawi — Product Leader, AI Builder, Educator",
    description: "Building the future of AI, and helping people grow into it.",
    url: BASE_URL,
    siteName: "Nabeel Barqawi",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Nabeel Barqawi presenting on stage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabeel Barqawi — Product Leader, AI Builder, Educator",
    description: "Building the future of AI, and helping people grow into it.",
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nabeel Barqawi",
  url: BASE_URL,
  image: `${BASE_URL}/og.jpg`,
  jobTitle: "Product Leader, AI Builder & Educator",
  description:
    "Product leader, AI builder, and educator helping people learn, build, connect, and create meaningful impact. Leading Conversational AI at Disney.",
  email: "nabeelbarqawi@gmail.com",
  sameAs: [
    "https://linkedin.com/in/nabeelbarqawi",
    "https://github.com/nabeelbarqawi-stack",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${trainOne.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.platform.openai.com" />
        <link rel="dns-prefetch" href="https://api.openai.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ background: "var(--ink)", color: "var(--fg)" }}>
        <a href="#main-content" className="skip-link">Skip to content</a>

        <SiteChrome>{children}</SiteChrome>

        <Analytics />

        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
