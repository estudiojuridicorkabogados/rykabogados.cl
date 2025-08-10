"use client";

import { motion } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";

export const AnimatedTitle = () => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <motion.h2
        variants={itemVariants}
        className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl"
      >
        Blog y Noticias
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="mt-2 text-lg/8 text-gray-600"
      >
        Mantente al día con las últimas noticias e información de nuestro equipo
      </motion.p>
    </div>
  );
};
