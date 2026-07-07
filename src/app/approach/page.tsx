import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Approach — Nabeel Barqawi",
  description: "How I work — pluralist by nature, contrarian in training, focused on first principles.",
  alternates: { canonical: "https://www.nabeelbarqawi.com/approach" },
};

export default function ApproachPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Approach />
      </main>
      <Footer />
    </>
  );
}
