"use client";

import { motion } from "motion/react";

import { WhatsappIcon } from "@/components/icons/Whatsapp";
import { Button } from "@/components/ui/Button";
import { itemVariants } from "@/lib/utils/animations";
import { URLS } from "@/lib/utils/constants";

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
        className="lg:max-w-4xl text-3xl lg:text-7xl mb-4 lg:mb-8 text-gray-60"
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
        <Button variant="reserva-form-link" asChild>
          <a href="#reserva-form-section" onClick={handleScrollToForm}>
            Reserva un llamada
          </a>
        </Button>

        <Button variant="whatsapp" asChild>
          <a
            href={URLS.whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center"
          >
            <WhatsappIcon className="mr-2 w-4 h-4 fill-current text-black group-hover:text-white transition-colors" />
            Hablemos por Whatsapp
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
};
