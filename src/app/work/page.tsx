import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SelectedWork from "@/components/SelectedWork";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Work — Nabeel Barqawi",
  description: "Selected projects — turning complex systems into products that ship.",
  alternates: { canonical: "https://www.nabeelbarqawi.com/work" },
};

export default function WorkPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <SelectedWork />
      </main>
      <Footer />
    </>
  );
}
