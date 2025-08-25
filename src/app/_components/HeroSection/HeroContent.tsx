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
      className="relative z-10 mx-auto w-6xl lg:max-w-6xl xl:max-w-7xl px-6 flex flex-col"
    >
      <motion.span
        className="uppercase text-sm text-accent font-bold mb-4 tracking-[3px]"
        variants={itemVariants}
      >
        Retamales Kowalski Abogados
      </motion.span>

      <motion.h1
        variants={itemVariants}
        className="max-w-3xl text-6xl lg:text-7xl mb-8 text-gray-60"
      >
        Excelencia, Lealtad <br />y Integridad
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-lg text-white/90 font-light tracking-wide max-w-2xl"
      >
        Retamales y Kowalski Abogados es un estudio jurídico que ofrece sus
        servicios a lo largo de todo Chile, conformado por un equipo de abogados
        especializados.
      </motion.p>
    </motion.div>
  );
};
