"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { containerVariants, itemVariants } from "@/utils/animations";

export const AsesoriaTrabajadoresHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-studio-working.jpg"
        alt="Library background"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.3 }}
        className="relative z-10 mx-auto w-6xl max-w-6xl px-6 flex flex-col"
      >
        <motion.h1
          variants={itemVariants}
          className="max-w-3xl text-4xl lg:text-5xl mb-8 text-white"
        >
          Asesoria Trabajador
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="lg:text-lg text-white/90 font-light tracking-wide max-w-2xl"
        >
          Si eres trabajador, tomamos tu caso a resultados, lo que significa que
          nuestros honorarios se cobrarán exclusivamente sobre la ganancia
          efectivamente percibida, ¡Sin gastos! Nuestros abogados te asesorarán
          en todo el transcurso del juicio, incluyendo inspecciones del trabajo,
          ya sea que necesites representación jurídica en:
        </motion.p>
      </motion.div>
    </section>
  );
};
