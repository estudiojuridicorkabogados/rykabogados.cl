"use client";

import { motion } from "motion/react";

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
    <motion.section
      id="areas"
      initial="hidden"
      whileInView="visible"
      className="bg-[#F7F6F6] py-16 lg:py-32"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="section-container text-black  flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-32">
        <div className="flex-2 flex flex-col gap-2 lg:gap-8">
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-5xl">
            Reducimos riesgos, evitamos multas, <br />
            defendemos tu empresa.
          </motion.h2>

          <motion.p variants={itemVariants}>
            Acompañamos a empresas en la gestión estratégica de sus relaciones
            laborales, previniendo conflictos, reduciendo contingencias y
            defendiendo el negocio cuando es necesario
          </motion.p>
        </div>

        <div className="flex-1 flex items-center">
          <ul className="list-disc pl-5">
            {AREAS.map((area, i) => (
              <motion.li
                variants={itemVariants}
                key={i}
                className="lg:text-xl mb-2 last:mb-0"
              >
                {area}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.section>
  );
};
