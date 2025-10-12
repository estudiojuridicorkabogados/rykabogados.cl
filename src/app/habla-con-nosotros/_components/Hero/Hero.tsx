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
        src="/images/heros/tribunales-2.webp"
        alt="Tribunal de Santiago de Chile"
        sizes="100vw"
        className="object-cover object-top scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <HeroContent
        label="Habla con nosotros"
        title="¿Despido Injustificado? Asesoría legal gratuita."
        description="Si requiere asistencia jurídica especializada, nuestro bufete ofrece una amplia gama de servicios legales para proteger sus derechos laborales. Desde asesoramiento en despidos injustificados hasta representación en procesos judiciales, estamos comprometidos con la defensa de sus intereses."
      />
    </section>
  );
};
