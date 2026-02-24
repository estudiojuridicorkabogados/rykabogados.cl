"use client";

import Image from "next/image";

import { HeroContent } from "./HeroContent";

export const Hero = () => {
  return (
    <section className="relative h-auto py-16 lg:h-[80vh] flex items-center justify-center overflow-hidden">
      <Image
        priority
        fill
        loading="eager"
        src="/images/heros/statue.webp"
        alt="Tribunal de Santiago de Chile"
        sizes="100vw"
        className="object-cover object-top scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <HeroContent
        label="Agenda una reunión en menos de 24 horas hábiles"
        title="Asesoría laboral integral para empresas"
        description="En RK Abogados acompañamos a las empresas en la gestión estratégica de sus relaciones laborales y requerimientos legales. Cuéntanos tu caso y te entregaremos una orientación clara para definir el mejor curso de acción."
      />
    </section>
  );
};
