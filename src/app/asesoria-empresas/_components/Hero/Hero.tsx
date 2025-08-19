import Image from "next/image";
import { HeroContent } from "./HeroContent";

export const AsesoriaEmpresasHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-studio-working.jpg"
        alt="Library background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <HeroContent />
    </section>
  );
};
