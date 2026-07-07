import type { Metadata } from "next";
import Nav from "@/components/Nav";
import About from "@/components/About";
import Proof from "@/components/Proof";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Nabeel Barqawi",
  description: "Product and AI leader building experiences used by millions — the story and the track record.",
  alternates: { canonical: "https://www.nabeelbarqawi.com/about" },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <About />
        <Proof />
      </main>
      <Footer />
    </>
  );
}
