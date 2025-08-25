import Image from "next/image";

import { HeroContent } from "./HeroContent";

export const AsesoriaTrabajadoresHero = () => {
  return (
    <section className="relative h-[590px] lg:h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/team-trabajando.jpg"
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
