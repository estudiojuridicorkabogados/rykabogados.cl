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
      className="relative z-10 mx-auto w-6xl max-w-6xl px-6 flex flex-col"
    >
      <motion.h1
        variants={itemVariants}
        className="max-w-3xl text-4xl lg:text-5xl mb-8 text-white"
      >
        Asesoría Empresas
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="lg:text-lg text-white/90 font-light tracking-wide max-w-2xl"
      >
        Nuestro objetivo es prestar una asesoría de la más alta calidad, con
        profesionalismo y compromiso para nuestros clientes. Ofrecemos ser el
        respaldo de todo el proceso jurídico requerido por la Empresa,
        ofreciendo a cambio un trato confidencial y personalizado, teniendo
        siempre cercanía y comunicación directa con el cliente, resolviendo los
        asuntos jurídicos mediante la adaptación de nuestro servicio al perfil y
        objetivo de su Compañía.
      </motion.p>
    </motion.div>
  );
};
