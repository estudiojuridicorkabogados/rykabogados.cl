"use client";

import * as m from "motion/react-m";

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
            <span className="shrink-0 text-black/50">Monto en Riesgo:</span>
            <span className="font-medium text-black">{caso.montoRiesgo}</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 text-black/50">
              Monto Final Tras Defensa:
            </span>
            <span className="font-medium text-black">{caso.montoFinal}</span>
          </div>
        </div>
      ) : caso.resultado ? (
        <div className="flex gap-2 text-sm">
          <span className="shrink-0 text-black/50">Resultado:</span>
          <span className="font-medium text-black uppercase">
            {caso.resultado}
          </span>
        </div>
      ) : null}
      <div className="space-y-1 text-sm">
        <span className="font-medium text-black">Logro Clave: </span>
        <span className="text-black/50">{caso.logroClave}</span>
      </div>
    </div>
  ),
}));

export const Casos: React.FC = () => {
  return (
    <m.section
      initial="hidden"
      whileInView="visible"
      className="bg-white py-16 lg:min-h-[690px] lg:py-28"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="space-y-2 px-0">
            <m.h2
              variants={itemVariants}
              className="text-3xl font-semibold text-black md:text-5xl lg:text-4xl"
            >
              Casos de éxito empresarial.
            </m.h2>

            <m.p variants={itemVariants} className="text-black md:w-1/2">
              Selección de sentencias ganadas y resultados de alto impacto.
            </m.p>

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
    </m.section>
  );
};
