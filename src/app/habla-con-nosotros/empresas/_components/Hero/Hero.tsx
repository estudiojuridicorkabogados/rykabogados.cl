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
        src="/images/heros/tribunales.webp"
        alt="Tribunal de Santiago de Chile"
        sizes="100vw"
        className="object-cover object-top scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <HeroContent
        label="Habla con nosotros"
        title="¿Despido Injustificado? Consulta inicial gratuita"
        description="En RK Abogados revisamos tu caso, analizamos tu despido y te explicamos tus derechos. Trabajamos bajo un modelo de honorarios a resultado, es decir, solo pagas si ganas."
      />
    </section>
  );
};
