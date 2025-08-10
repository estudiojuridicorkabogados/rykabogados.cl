"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { containerVariants, itemVariants } from "@/lib/utils/animations";

// @TODO I feel like here there's room for improvment by splitting SSR and CSR

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}

      <Image
        src="/images/hero-library.webp"
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
        <motion.span
          className="uppercase text-sm text-accent font-bold mb-4 tracking-[3px]"
          variants={itemVariants}
        >
          Nuestra Misión
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
          Retamales y Kowalsky Abogados es un estudio jurídico que ofrece sus
          servicios a lo largo de todo Chile, conformado por un equipo de
          abogados especializados.
        </motion.p>
      </motion.div>
    </section>
  );
};
