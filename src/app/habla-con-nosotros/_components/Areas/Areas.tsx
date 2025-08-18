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
      className="bg-[#F7F6F6] py-32"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="text-black mx-auto min-w-6xl max-w-6xl flex flex-col lg:flex-row lg:gap-32">
        <div className="flex-2 flex flex-col gap-8">
          <motion.h2 variants={itemVariants} className="text-5xl">
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
          <ul className="list-disc">
            {AREAS.map((area, i) => (
              <motion.li
                variants={itemVariants}
                key={i}
                className="text-xl mb-2 last:mb-0"
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
