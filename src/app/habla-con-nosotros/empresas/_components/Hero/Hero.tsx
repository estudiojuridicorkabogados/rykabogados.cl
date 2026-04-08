"use client";

import Image from "next/image";

import { HeroContent } from "./HeroContent";
import { PricesLink } from "./PricesLink";

export const Hero = () => {
  return (
    <section className="relative h-auto py-16 lg:h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
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
      </div>

      <HeroContent
        label="Asesoría laboral integral para empresas y pymes"
        title="Evita errores laborales que pueden costarle millones"
        description="Somos el área legal externa de tu empresa. Soporte continuo en derecho laboral, comercial y societario."
      />

      <PricesLink />
    </section>
  );
};
