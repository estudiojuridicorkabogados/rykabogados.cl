import React from "react";
import Image from "next/image";

import { NosotrosLink } from "./NosotrosLink";

export const TeamSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mx-auto px-6 lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl">
        <div className="w-full lg:w-1/2 h-[390px] relative">
          <Image
            src="/images/team.webp"
            alt="Equipo de RyK Abogados"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <span className="uppercase text-sm text-accent font-bold tracking-[3px]">
            Encuentra el equipo
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-60">
            Nosostros
          </h2>

          <p className="text-gray-60 mb-4">
            En Retamales Kowalski Abogados contamos con un equipo de
            profesionales calificados, comprometidos y dispuestos a entregar una
            asesoría integral que le permita dar cumplimiento a la normativa
            laboral y previsional vigente, prevenir infracciones.
          </p>

          <NosotrosLink />
        </div>
      </div>
    </section>
  );
};
