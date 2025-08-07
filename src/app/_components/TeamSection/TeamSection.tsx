import { LongArrowRight } from "@/components/icons/LongArrowRight";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import React from "react";

const COLLEAGUES = [
  { name: "Camila Retamales", role: "Head lawyer" },
  { name: "Camila Retamales", role: "Lawyer" },
  { name: "Camila Retamales", role: "Lawyer" },
  { name: "Camila Retamales", role: "Head lawyer" },
  { name: "Camila Retamales", role: "Lawyer" },
] as const;

export const TeamSection = () => {
  return (
    <section className="py-28 bg-primary">
      <div className="flex flex-col lg:flex-row lg:gap-16 mx-auto px-6 max-w-6xl">
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

          <h2 className="text-5xl font-bold text-gray-60">Nosostros</h2>

          <p className="text-gray-60">
            En Retamales Kowalsky Abogados contamos con un equipo de
            profesionales calificados, comprometidos y dispuestos a entregar una
            asesoría integral que le permita dar cumplimiento a la normativa
            laboral y previsional vigente, prevenir infracciones.
          </p>

          <div className="grid grid-cols-2 gap-2 mb-6">
            {COLLEAGUES.map(({ role, name }, index) => (
              <p key={index} className="font-semibold text-gray-60">
                {role}: <span className="font-normal">{name}</span>
              </p>
            ))}
          </div>

          <Button className="w-fit" variant="white-outline-on-primary" animateOnClick>
            Mas info
          </Button>
        </div>
      </div>
    </section>
  );
};
