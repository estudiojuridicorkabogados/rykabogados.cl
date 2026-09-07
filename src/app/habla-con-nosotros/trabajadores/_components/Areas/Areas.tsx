"use client";

import { motion } from "motion/react";

import { containerVariants, itemVariants } from "@/lib/utils/animations";

const AREAS = [
  "Despido injustificado",
  "Autodespido",
  "Tutela de derechos fundamentales",
  "Cobro de prestaciones",
  "Cálculo de finiquito",
  "Accidentes o enfermedades profesionales",
  "Organizaciones sindicales",
];

export const Areas = () => {
  return (
    <motion.section
      id="areas"
      initial="hidden"
      whileInView="visible"
      className="bg-gray-60 py-16 lg:py-32"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="section-container flex flex-col gap-8 text-black lg:flex-row lg:gap-16 xl:gap-32">
        <div className="flex flex-2 flex-col gap-2 lg:gap-8">
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-5xl">
            No hay nada que perder. <br />
            Defiende lo que es tuyo.
          </motion.h2>

          <motion.p variants={itemVariants}>
            Si te despidieron injustamente, puedes ser indemnizado
            económicamente. Analizamos tu caso sin costo y solo pagas si
            obtenemos resultados a tu favor.
          </motion.p>
        </div>

        <div className="flex flex-1 items-center">
          <ul className="list-disc pl-5">
            {AREAS.map((area, i) => (
              <motion.li
                variants={itemVariants}
                key={i}
                className="mb-2 last:mb-0 lg:text-xl"
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
