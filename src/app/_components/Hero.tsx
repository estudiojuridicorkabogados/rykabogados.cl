"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "@/utils/animations";

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-library.webp"
          alt="Library background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 container mx-auto w-4/5 px-6"
      >
        <motion.h1
          variants={itemVariants}
          className="max-w-3xl text-6xl lg:text-7xl mb-8"
        >
          Excelencia, Lealtad <br />y Integridad
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg lg:text-xl text-white/90 font-light tracking-wide leading-relaxed max-w-2xl"
        >
          Retamales y Kowalsky Abogados es un estudio jurídico que ofrece sus
          servicios a lo largo de todo Chile, conformado por un equipo de
          abogados especializados.
        </motion.p>
      </motion.div>
    </section>
  );
};
