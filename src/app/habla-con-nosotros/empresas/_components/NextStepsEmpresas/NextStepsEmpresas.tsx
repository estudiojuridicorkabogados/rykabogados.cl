"use client";

import { motion } from "motion/react";

import { HablaConNosotrosStep } from "@/components/HablaConNosotrosStep/Step";
import { containerVariants, itemVariants } from "@/lib/utils/animations";

import { STEPS } from "./constants";

export const NextStepsEmpresas = () => {
  return (
    <motion.section
      id="areas"
      initial="hidden"
      whileInView="visible"
      className="bg-white py-16 lg:py-32"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="flex flex-col gap-8 px-6 text-black lg:mx-auto lg:max-w-4xl lg:min-w-4xl lg:gap-16 lg:px-0 xl:max-w-6xl xl:min-w-6xl 2xl:w-7xl 2xl:max-w-7xl 2xl:min-w-7xl">
        <div className="flex flex-2 flex-col gap-2 lg:gap-8">
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-5xl">
            Próximos pasos
          </motion.h2>

          <motion.p variants={itemVariants} className="lg:w-1/2">
            Guiamos a tu empresa desde la evaluación inicial hasta la
            implementación de soluciones legales o laborales, entregando
            definiciones claras para tomar decisiones oportunas y bien
            informadas
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
          {STEPS.map((step, index) => (
            <HablaConNosotrosStep key={index} step={step} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
