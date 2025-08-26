"use client";

import { motion } from "motion/react";

import { itemVariants } from "@/utils/animations";

interface HeroContentProps {
  label: string;
  title: React.ReactElement | string;
  description: React.ReactElement | string;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  label,
  title,
  description,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.3 }}
      className="relative z-10 mx-auto lg:w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl px-6 flex flex-col"
    >
      <motion.span
        variants={itemVariants}
        className="uppercase text-xs lg:text-sm text-accent font-bold mb-2 lg:mb-4 tracking-[3px]"
      >
        {label}
      </motion.span>

      <motion.h1
        variants={itemVariants}
        className="lg:max-w-3xl text-5xl lg:text-7xl mb-4 lg:mb-8 text-gray-60"
      >
        {title}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="lg:text-lg text-white/90 font-light tracking-wide lg:max-w-2xl"
      >
        {description}
      </motion.p>
    </motion.div>
  );
};
