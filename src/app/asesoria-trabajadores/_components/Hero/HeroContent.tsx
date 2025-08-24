"use client";

import { motion } from "motion/react";

import { itemVariants } from "@/utils/animations";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.3 }}
      className="relative z-10 mx-auto w-7xl max-w-7xl px-8 flex flex-col"
    >
      <motion.span
        variants={itemVariants}
        className="uppercase text-sm text-accent font-bold mb-4 tracking-[3px]"
      >
        Nuestro servicios
      </motion.span>
      <motion.h1
        variants={itemVariants}
        className="max-w-3xl text-4xl lg:text-5xl mb-8 text-white"
      >
        Asesoría Trabajador
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="lg:text-lg text-white/90 font-light tracking-wide max-w-2xl"
      >
        Si eres trabajador, tomamos tu caso a resultados, lo que significa que
        nuestros honorarios se cobrarán exclusivamente sobre la ganancia
        efectivamente percibida, ¡Sin gastos! Nuestros abogados te asesorarán en
        todo el transcurso del juicio, incluyendo inspecciones del trabajo, ya
        sea que necesites representación jurídica en las areas siguientes.
      </motion.p>
    </motion.div>
  );
};
