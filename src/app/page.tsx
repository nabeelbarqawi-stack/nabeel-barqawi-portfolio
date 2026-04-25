import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import ParticleSectionLoader from "@/components/ParticleSectionLoader";
import Approach from "@/components/Approach";
import SelectedWork from "@/components/SelectedWork";
import Services from "@/components/Services";
import Proof from "@/components/Proof";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <ParticleSectionLoader />
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
