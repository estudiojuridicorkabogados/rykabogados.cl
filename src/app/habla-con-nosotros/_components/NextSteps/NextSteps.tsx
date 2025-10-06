"use client";

import { motion } from "motion/react";

import { containerVariants, itemVariants } from "@/lib/utils/animations";

import { STEPS } from "./constants";
import { Step } from "./Step";

export const NextSteps = () => {
  return (
    <motion.section
      id="areas"
      initial="hidden"
      whileInView="visible"
      className="bg-white py-16 lg:py-32"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="text-black lg:mx-auto lg:min-w-4xl lg:max-w-4xl xl:min-w-6xl xl:max-w-6xl 2xl:min-w-7xl 2xl:max-w-7xl 2xl:w-7xl flex flex-col gap-8 lg:gap-16 px-6 lg:px-0">
        <div className="flex-2 flex flex-col gap-2 lg:gap-8">
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-5xl">
            Los proximos pasos
          </motion.h2>

          <motion.p variants={itemVariants} className="lg:w-1/2">
            Si te despidieron injustamente, puedes ser indemnizado
            económicamente por ello, compensación que dependerá de la causal
            invocada por tu empleador.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 lg:gap-8">
          {STEPS.map((step, index) => (
            <Step key={index} step={step} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
