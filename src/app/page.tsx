import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Approach from "@/components/Approach";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import Proof from "@/components/Proof";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const ParticleSection = dynamic(() => import("@/components/ParticleSection"), { ssr: false });

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <ParticleSection />
        <Approach />
        <SelectedWork />
        <Services />
        <Proof />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
