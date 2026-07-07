import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services — Nabeel Barqawi",
  description: "Four ways to work together — from breaking into product to AI training for teams.",
  alternates: { canonical: "https://www.nabeelbarqawi.com/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Services />
      </main>
      <Footer />
    </>
  );
}
