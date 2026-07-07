import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Programs from "@/components/Programs";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Programs — Nabeel Barqawi",
  description: "Three ways to get started — a single session, a 5-week program, or a corporate workshop.",
  alternates: { canonical: "https://www.nabeelbarqawi.com/programs" },
};

export const revalidate = 60;

export default function ProgramsPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Programs />
      </main>
      <Footer />
    </>
  );
}
