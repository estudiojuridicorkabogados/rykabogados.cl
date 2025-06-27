"use client";

import { Variants } from "motion";
import { motion } from "motion/react";

import { smoothSpring } from "@/utils/animations";

const variants: Variants = {
  offscreen: {
    y: 40,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: smoothSpring,
  },
};

export const AnimatedTitle = () => {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <motion.h2
        variants={variants}
        className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl"
      >
        Blog y Noticias
      </motion.h2>
      <motion.p variants={variants} className="mt-2 text-lg/8 text-gray-600">
        Mantente al día con las últimas noticias e información de nuestro equipo
      </motion.p>
    </div>
  );
};
