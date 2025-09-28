"use client";

import { HeroSection } from "@/components/Hero/HeroSection";

export const Hero = () => {
  return (
    <HeroSection
      className="h-auto lg:h-screen"
      label="Habla con nosotros"
      title="¿Despido Injustificado? Asesoría legal gratuita."
      description="Si requiere asistencia jurídica especializada, nuestro bufete ofrece una amplia gama de servicios legales para proteger sus derechos laborales. Desde asesoramiento en despidos injustificados hasta representación en procesos judiciales, estamos comprometidos con la defensa de sus intereses."
      image={{
        src: "/images/heros/studio-working.jpg",
        alt: "Nuestro equipo trabajando",
      }}
    />
  );
};
