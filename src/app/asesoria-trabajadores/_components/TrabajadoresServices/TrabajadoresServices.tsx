"use client";

import { motion, stagger } from "motion/react";

import { Accordion } from "@/components/Accordion/Accordion";
import { itemVariants } from "@/lib/utils/animations";

import { SERVICES } from "./services";

export const TrabajadoresServices = () => {
  return (
    <motion.section
      id="hero"
      initial="hidden"
      whileInView="visible"
      className="bg-white py-16 sm:py-24"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="flex flex-col gap-12 lg:gap-8 mx-auto lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl px-6 lg:px-8">
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-black"
        >
          Nuestros Servicios para Trabajadores
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 lg:w-2/3"
        >
          Sabemos que enfrentar un problema laboral puede ser difícil. En RK
          Abogados te acompañamos en cada paso, entregándote apoyo legal,
          claridad y soluciones concretas para proteger tus derechos y tu
          tranquilidad.
        </motion.p>
      </div>

      <Accordion entries={SERVICES} />
    </motion.section>
  );
};
