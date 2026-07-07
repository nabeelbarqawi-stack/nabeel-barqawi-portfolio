import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import ParticleSectionLoader from "@/components/ParticleSectionLoader";
import ApproachTeaser from "@/components/ApproachTeaser";
import Programs from "@/components/Programs";
import AboutTeaser from "@/components/AboutTeaser";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Philosophy />
        <ParticleSectionLoader />
        <ApproachTeaser />
        <Programs compact />
        <AboutTeaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
