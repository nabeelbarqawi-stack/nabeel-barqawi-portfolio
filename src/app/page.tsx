import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import ParticleSection from "@/components/ParticleSection";
import HowIWork from "@/components/HowIWork";
import SelectedWork from "@/components/SelectedWork";
import WhatIDo from "@/components/WhatIDo";
import ProofStrip from "@/components/ProofStrip";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <ParticleSection />
      <HowIWork />
      <SelectedWork />
      <WhatIDo />
      <ProofStrip />
      <About />
      <FinalCTA />
    </main>
  );
}
