import React from "react";
import Image from "next/image";

import { NosotrosLink } from "./NosotrosLink";

export const TeamSection = () => {
  return (
    <section className="bg-primary py-16 lg:py-24">
      <div className="mx-auto flex flex-col gap-8 px-6 lg:max-w-6xl lg:flex-row lg:gap-16 2xl:w-7xl 2xl:max-w-7xl">
        <div className="relative h-[390px] w-full lg:w-1/2">
          <Image
            src="/images/team.webp"
            alt="Equipo de RK Abogados"
            fill
            className="rounded object-cover"
          />
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-1/2">
          <h2 className="text-gray-60 text-4xl font-bold lg:text-5xl">
            Nosostros
          </h2>

          <p className="text-gray-60">
            En RK Abogados entendemos que la confianza no se promete, se
            demuestra. Enfrentamos cada desafío con pasión, ética y compromiso
            con la excelencia, transformando los problemas legales en soluciones
            concretas.
          </p>

          <p className="text-gray-60 mb-4">
            Nuestro equipo, comprometido y riguroso, combina experiencia,
            innovación y una visión humana del Derecho para brindar asesoría
            integral y estratégica a cada cliente.
          </p>

          <NosotrosLink />
        </div>
      </div>
    </section>
  );
};
