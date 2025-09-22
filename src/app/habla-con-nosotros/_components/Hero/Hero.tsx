"use client";

import { HeroSection } from "@/components/Hero/HeroSection";

export const Hero = () => {
  return (
    <HeroSection
      className="h-auto lg:h-auto py-32"
      label="Habla con nosotros"
      title="¿Despido Injustificado? Asesoría legal gratuita. Te representamos legalmente."
      description="Si requiere asistencia jurídica especializada, nuestro bufete ofrece una amplia gama de servicios legales para proteger sus derechos laborales. Desde asesoramiento en despidos injustificados hasta representación en procesos judiciales, estamos comprometidos con la defensa de sus intereses. Para una consulta inicial sin costo, simplemente programe una cita completando el formulario que encontrará a continuación. Nuestro equipo de abogados especializados evaluará su caso y le proporcionará la orientación legal que necesita."
      image={{
        src: "/images/heros/studio-working.jpg",
        alt: "Nuestro equipo trabajando",
      }}
    />
  );
};
