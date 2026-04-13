"use client";

import { motion } from "motion/react";

import { Button } from "@/components/ui/Button";
import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";
import { itemVariants } from "@/lib/utils/animations";

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
  const handleScrollToForm = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("reserva-form-section");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.3 }}
      className="section-container relative z-10 flex flex-col lg:w-4xl xl:w-7xl 2xl:w-7xl"
    >
      <motion.span
        variants={itemVariants}
        className="uppercase text-xs lg:text-sm text-accent font-bold mb-3 lg:mb-4 tracking-[3px]"
      >
        {label}
      </motion.span>

      <motion.h1
        variants={itemVariants}
        className="lg:max-w-2xl text-3xl lg:text-5xl 2xl:text-7xl mb-4 lg:mb-8 text-gray-60"
      >
        {title}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="lg:text-lg text-white/90 font-light tracking-wide lg:max-w-2xl mb-16 lg:mb-8"
      >
        {description}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row gap-4"
      >
        <Button variant="white-outline-on-primary" asChild>
          <a href="#reserva-form-section" onClick={handleScrollToForm}>
            Agenda una asesoría
          </a>
        </Button>

        <WhatsappLink />
      </motion.div>
    </motion.div>
  );
};
