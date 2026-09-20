"use client";

import tribunales from "@public/images/heros/tribunales.webp";
import Image from "next/image";

import { HeroContent } from "./HeroContent";

export const Hero = () => {
  return (
    <section className="relative flex h-auto items-center justify-center overflow-hidden py-16 lg:h-[80vh]">
      <Image
        preload
        fetchPriority="high"
        loading="eager"
        fill
        src={tribunales}
        alt="Tribunal de Santiago de Chile"
        sizes="100vw"
        placeholder="blur"
        className="scale-110 object-cover object-top"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <HeroContent
        label="Defensa laboral para trabajadores"
        title={
          <>
            <span>¿Crees que tu despido fue injustificado? </span>
            <br />
            <span>Evaluamos tu caso sin costo</span>
          </>
        }
        description={
          <>
            <p className="mt-4">
              Efectuamos un análisis de las causales de término y tus
              antecedentes laborales para entregarte claridad sobre tus
              derechos. En los casos aceptados, ofrecemos la alternativa de
              pactar honorarios a resultado, cobrando únicamente si obtenemos un
              beneficio económico para ti.
            </p>
            <p className="mt-4">
              Revisamos tu despido y finiquito para explicarte qué puedes
              reclamar, los plazos y los próximos pasos. Si contamos con
              antecedentes suficientes, estimamos preliminarmente el monto de
              una eventual demanda.
            </p>
            {/* <p className="mt-4">
              Atendemos en todo Chile, preferentemente por videollamada, y en
              los casos evaluados y aceptados podemos trabajar con honorarios a
              resultado.
            </p> */}
          </>
        }
      />
    </section>
  );
};
