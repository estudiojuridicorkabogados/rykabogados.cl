"use client";

import * as m from "motion/react-m";

import { containerVariants, itemVariants } from "@/lib/utils/animations";

const AREAS = [
  "Juicios laborales",
  "Asesoría laboral corporativa",
  "Capacitaciones para equipos y jefaturas",
  "Fiscalizaciones y multas de la Inspección del Trabajo",
  "Negociación colectiva y sindicatos",
  "Otras materias",
];

export const Areas = () => {
  return (
    <m.section
      id="areas"
      initial="hidden"
      whileInView="visible"
      className="bg-gray-60 py-16 lg:py-32"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="section-container flex flex-col gap-8 text-black lg:flex-row lg:gap-16 xl:gap-32">
        <div className="flex flex-2 flex-col gap-2 lg:gap-8">
          <m.h2 variants={itemVariants} className="text-3xl lg:text-5xl">
            Reducimos riesgos, evitamos multas, defendemos tu empresa.
          </m.h2>

          <m.p variants={itemVariants}>
            Acompañamos a empresas en la gestión estratégica de sus relaciones
            laborales, previniendo conflictos, reduciendo contingencias y
            defendiendo el negocio cuando es necesario
          </m.p>
        </div>

        <div className="flex flex-1 items-center">
          <ul className="list-disc pl-5">
            {AREAS.map((area, i) => (
              <m.li
                variants={itemVariants}
                key={i}
                className="mb-2 last:mb-0 lg:text-xl"
              >
                {area}
              </m.li>
            ))}
          </ul>
        </div>
      </div>
    </m.section>
  );
};
