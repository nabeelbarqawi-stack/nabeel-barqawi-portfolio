"use client";

import dynamic from "next/dynamic";

const ParticleSection = dynamic(() => import("./ParticleSection"), { ssr: false });

export default function ParticleSectionLoader() {
  return <ParticleSection />;
}
