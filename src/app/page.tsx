import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import ParticleSectionLoader from "@/components/ParticleSectionLoader";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Philosophy />
        <ParticleSectionLoader />
      </main>
      <Footer />
    </>
  );
}
