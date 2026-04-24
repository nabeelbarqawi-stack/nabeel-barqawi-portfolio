import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nabeel Barqawi — Making complex systems simple.",
  description:
    "AI-powered. Human-centered. Product-driven. I build products and experiences used by millions.",
  openGraph: {
    title: "Nabeel Barqawi",
    description: "Making complex systems simple.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0B0B0C] text-[#F5F5F5]">
        {children}
      </body>
    </html>
  );
}
