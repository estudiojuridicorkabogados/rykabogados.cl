import React from "react";
import Image from "next/image";

const COLLEAGUES = [
  { name: "Camila Retamales", role: "Abogada Fundadora" },
  { name: "Luciano Ascui", role: "Abogado Derecho Laboral" },
  { name: "Javiera Fredes", role: "Abogado Derecho Laboral" },
  { name: "Bastian Morales", role: "Abogado Derecho Laboral" },
  { name: "Camila Retamales", role: "Abogado Derecho Laboral" },
] as const;

export const TeamSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="flex flex-col lg:flex-row lg:gap-16 mx-auto px-6 lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl">
        <div className="w-full lg:w-1/2 relative">
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

          <p className="text-gray-60">
            En Retamales Kowalski Abogados contamos con un equipo de
            profesionales calificados, comprometidos y dispuestos a entregar una
            asesoría integral que le permita dar cumplimiento a la normativa
            laboral y previsional vigente, prevenir infracciones.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-6">
            {COLLEAGUES.map(({ role, name }, index) => (
              <p key={index} className="font-semibold text-gray-60">
                {role}: <span className="font-normal">{name}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
