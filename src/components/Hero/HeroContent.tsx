"use client";

import { motion } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";

import { Button } from "../ui/Button";

interface HeroContentProps {
  label: string;
  title: React.ReactElement | string;
  description: React.ReactElement | string;
  button?: {
    label: string;
    href: string;
  };
}

export const HeroContent: React.FC<HeroContentProps> = ({
  label,
  title,
  description,
  button,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.3 }}
      className="relative z-10 mx-auto flex flex-col px-6 lg:w-6xl lg:max-w-6xl 2xl:w-7xl 2xl:max-w-7xl"
    >
      <motion.span
        variants={itemVariants}
        className="hero-title text-accent mb-2 text-xs font-bold tracking-[3px] uppercase lg:mb-4 lg:text-sm"
      >
        {label}
      </motion.span>

      <motion.h1
        variants={itemVariants}
        className="hero-title text-gray-60 mb-4 text-5xl lg:mb-6 lg:max-w-3xl lg:text-7xl"
      >
        {title}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="hero-description font-base tracking-wide text-white/90 lg:max-w-2xl lg:text-lg"
      >
        {description}
      </motion.p>

      {button && (
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col gap-4 md:flex-row"
        >
          <Button variant="white-outline-on-primary" asChild>
            <a href={button.href}>{button.label}</a>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};
