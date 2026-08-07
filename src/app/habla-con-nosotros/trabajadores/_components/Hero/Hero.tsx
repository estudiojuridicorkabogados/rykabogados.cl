"use client";

import tribunales from "@public/images/heros/tribunales.webp";
import Image from "next/image";

import { HeroContent } from "./HeroContent";

export const Hero = () => {
  return (
    <section className="relative flex h-auto items-center justify-center overflow-hidden py-16 lg:h-[80vh]">
      <Image
        priority
        fill
        loading="eager"
        src={tribunales}
        alt="Tribunal de Santiago de Chile"
        sizes="100vw"
        placeholder="blur"
        className="scale-110 object-cover object-top"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <HeroContent
        label="Habla con nosotros"
        title={
          <>
            <span>¿Despido Injustificado?</span>
            <br />
            <span>Consulta inicial gratuita</span>
          </>
        }
        description="En RK Abogados revisamos tu caso, analizamos tu despido y te explicamos tus derechos. Trabajamos bajo un modelo de honorarios a resultado, es decir, solo pagas si ganas."
      />
    </section>
  );
};
