"use client";

import { motion, stagger } from "motion/react";

import { itemVariants } from "@/utils/animations";

import { Calendar } from "./Calendar";

export const Hero = () => {
  return (
    <motion.section
      id="hero"
      initial="hidden"
      whileInView="visible"
      className="w-full bg-[#252525] text-white py-32"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto max-w-7xl flex gap-8 h-full items-center">
        <div className="flex-1 flex items-center h-full">
          <Calendar />
        </div>

        <div className="flex-1">
          <motion.span
            className="uppercase text-sm text-accent font-bold mb-8 tracking-[3px]"
            variants={itemVariants}
          >
            Nuestra Misión
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="max-w-3xl text-6xl lg:text-6xl mb-4 text-gray-60"
          >
            ¿Despido Injustificado? Asesoría legal gratuita. <br />
            Te representamos legalmente.
          </motion.h1>

          <motion.p className="text-white" variants={itemVariants}>
            Ganamos sólo si tú ganas, pues nuestros honorarios dependen del
            resultado que obtengas. Te asesoramos sin costo, desde el primer
            momento, para interponer tu demanda por despido injustificado,
            autodespido, tutela de derechos fundamentales, cobro de
            prestaciones, cálculo de tu finiquito, accidente del trabajo, entre
            otras.
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
};
