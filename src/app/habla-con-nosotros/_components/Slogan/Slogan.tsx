"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { y: 400 },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      staggerChildren: 0.5,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 250 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

export const Slogan = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      className="relative w-screen h-[590px] lg:h-[490px] overflow-hidden"
      
      viewport={{ once: true, amount: 0.8 }}
    >
      <Image
        src="/images/hero-library.webp"
        alt="Some documents"
        fill
        className="object-cover"
      />

      <motion.div
        variants={containerVariants}
        className="absolute h-[400px] lg:h-[360px] bottom-0 left-0 right-0 w-full bg-primary/30 backdrop-blur-[40px] flex flex-col justify-center"
      >
        <div className="w-full lg:w-6xl xl:w-7xl lg:max-w-6xl xl:max-w-7xl mx-auto flex flex-col gap-4 lg:gap-4 p-6 lg:p-8">
          <motion.span
            variants={itemVariants}
            className="uppercase text-sm text-accent font-bold tracking-[3px]"
          >
            Listo para evaluar tu caso
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-5xl text-white">
            Defendemos tu derechos <br /> come si fueran nuestros.
          </motion.h2>
          <motion.span variants={itemVariants} className="text-white">
            Agenda tu sesión o háblanos por WhatsApp
          </motion.span>
        </div>
      </motion.div>
    </motion.section>
  );
};
