"use client";

import { motion } from "motion/react";

import { Accordion } from "@/components/Accordion/Accordion";
import { containerVariants, itemVariants } from "@/lib/utils/animations";

import { CASOS_ITEMS } from "./constants";

const accordionEntries = CASOS_ITEMS.map((caso) => ({
  title: caso.title,
  description: (
    <div className="space-y-3">
      <p className="text-sm text-black/60">{caso.rit}</p>
      {caso.montoRiesgo && caso.montoFinal ? (
        <div className="space-y-1 text-sm">
          <div className="flex gap-2">
            <span className="text-black/50 shrink-0">Monto en Riesgo:</span>
            <span className="font-medium text-black">{caso.montoRiesgo}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-black/50 shrink-0">
              Monto Final Tras Defensa:
            </span>
            <span className="font-medium text-black">{caso.montoFinal}</span>
          </div>
        </div>
      ) : caso.resultado ? (
        <div className="flex gap-2 text-sm">
          <span className="text-black/50 shrink-0">Resultado:</span>
          <span className="font-medium text-black uppercase">
            {caso.resultado}
          </span>
        </div>
      ) : null}
      <div className="text-sm space-y-1">
        <span className="font-medium text-black">Logro Clave: </span>
        <span className="text-black/50">{caso.logroClave}</span>
      </div>
    </div>
  ),
}));

export const Casos: React.FC = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      className="bg-white py-16 lg:py-28 lg:min-h-[690px]"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="px-0 space-y-2">
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl md:text-5xl font-semibold text-black"
            >
              Casos de éxito empresarial.
            </motion.h2>

            <motion.p variants={itemVariants} className="text-black md:w-1/2">
              Selección de sentencias ganadas y resultados de alto impacto.
            </motion.p>

            <div className="space-y-0">
              <Accordion
                entries={accordionEntries}
                fixedSize={false}
                showNumbers={false}
                fullSizeText
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
