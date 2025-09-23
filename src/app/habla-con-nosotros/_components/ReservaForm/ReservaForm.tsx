"use client";

import { motion, stagger, Variants } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";

import { Form } from "./Form";

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const ReservaForm = () => {
  return (
    <motion.section
      id="reserva-form-section"
      initial="hidden"
      whileInView="visible"
      className="w-full bg-primary text-white"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="py-16 lg:py-28">
        <div className="px-6 lg:px-0 lg:mx-auto lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="lg:w-1/3">
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl md:text-5xl font-semibold"
            >
              Reserva una llamada gratuita con nosotros
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-2xl text-white/80"
            >
              Reserva una llamada gratuita con uno de nuestros abogados para
              discutir tus necesidades legales y descubrir cómo podemos
              ayudarte.
            </motion.p>
          </div>

          <div className="flex items-center justify-center lg:w-1/2">
            <Form />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
