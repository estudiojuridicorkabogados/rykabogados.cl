"use client";

import * as m from "motion/react-m";

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
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.3 }}
      className="section-container relative z-10 flex flex-col lg:w-4xl xl:w-7xl 2xl:w-7xl"
    >
      <m.span
        variants={itemVariants}
        className="text-accent mb-3 text-xs font-bold tracking-[3px] uppercase lg:mb-4 lg:text-sm"
      >
        {label}
      </m.span>

      <m.h1
        variants={itemVariants}
        className="text-gray-60 mb-4 text-3xl lg:mb-8 lg:max-w-4xl lg:text-5xl 2xl:max-w-4xl 2xl:text-7xl"
      >
        {title}
      </m.h1>

      <m.div
        variants={itemVariants}
        className="mb-16 font-light tracking-wide text-white/90 lg:mb-8 lg:max-w-4xl lg:text-lg 2xl:max-w-4xl"
      >
        {description}
      </m.div>

      <m.div
        variants={itemVariants}
        className="flex flex-col gap-4 md:flex-row"
      >
        <Button variant="white-outline-on-primary" asChild>
          <a href="#reserva-form-section" onClick={handleScrollToForm}>
            Agenda una asesoría
          </a>
        </Button>

        <WhatsappLink />
      </m.div>
    </m.div>
  );
};
