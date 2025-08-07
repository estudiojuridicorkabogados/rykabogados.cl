"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { containerVariants, itemVariants } from "@/utils/animations";
import { useRef } from "react";

export const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src="/images/hero-library.webp"
          alt="Library background"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70" />
      </motion.div>

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
