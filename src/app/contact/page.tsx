import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Nabeel Barqawi",
  description: "Full-time, consulting, advisory, or fractional — tell me the shape of the problem.",
  alternates: { canonical: "https://www.nabeelbarqawi.com/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
