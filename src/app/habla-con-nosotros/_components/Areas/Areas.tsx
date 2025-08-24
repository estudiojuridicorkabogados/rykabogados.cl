"use client";

import { motion } from "motion/react";

import { containerVariants, itemVariants } from "@/utils/animations";

const AREAS = [
  "Despido Injustificado",
  "Autodespido",
  "Tutela de derechos fundamentales",
  "Cobro de prestaciones",
  "Cálculo de finiquito",
];

export const Areas = () => {
  return (
    <motion.section
      id="areas"
      initial="hidden"
      whileInView="visible"
      className="bg-[#F7F6F6] py-20 lg:py-32"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="text-black lg:mx-auto lg:min-w-6xl lg:max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-32 px-6 lg:px-0">
        <div className="flex-2 flex flex-col gap-2 lg:gap-8">
          <motion.h2 variants={itemVariants} className="text-2xl lg:text-5xl">
            Solo ganamos si tu ganas. <br />
            No hay nada que perder.
          </motion.h2>

          <motion.p variants={itemVariants}>
            Si te despidieron injustamente, puedes ser indemnizado
            económicamente por ello, compensación que dependerá de la causal
            invocada por tu empleador.
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
