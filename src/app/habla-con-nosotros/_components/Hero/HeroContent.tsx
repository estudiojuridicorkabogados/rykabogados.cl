"use client";

import { motion } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { LinkedinIcon } from "@/components/icons/Linkedin";

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
    const element = document.getElementById('reserva-form-section');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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
        className="lg:text-lg text-white/90 font-light tracking-wide lg:max-w-2xl mb-4 lg:mb-8"
      >
        {description}
      </motion.p>

      <motion.div variants={itemVariants} className="flex gap-4">
        <Button variant="reserva-form-link" asChild>
          <a href="#reserva-form-section" onClick={handleScrollToForm}>
            Reserva un llamada
          </a>
        </Button>

        <Button variant="whatsapp" asChild>
          <a href="http://api.whatsapp.com/send/?phone=56986395780&text=%C2%A1Hola%21+Me+gustar%C3%ADa+una+asesor%C3%ADa+laboral+gratuita&type=phone_number&app_absent=0">
            Hablamos para Whatsapp
            <LinkedinIcon className="ml-2 w-4 h-4 fill-current text-black group-hover:text-primary transition-colors" />
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
};
