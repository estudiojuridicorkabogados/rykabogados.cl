"use client";

import { motion, Variants } from "motion/react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";

const containerVariants: Variants = {
  hidden: { y: 400 },
  visible: {
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 250 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

export const Slogan = () => {
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
    <motion.section
      initial="hidden"
      whileInView="visible"
      className="relative w-screen h-[590px] lg:h-[490px] overflow-hidden"
      viewport={{ once: true, amount: 0.8 }}
    >
      <Image
        src="/images/heros/rk_advert_banner.webp"
        alt="Oficina de RK Abogados"
        sizes="100vw"
        fill
        className="object-cover"
      />

      <motion.div
        variants={containerVariants}
        className="absolute h-[460px] lg:h-[360px] -bottom-1 left-0 right-0 w-full bg-primary/30 backdrop-blur-2xl flex flex-col justify-center"
      >
        <div className="w-full section-container flex flex-col gap-4 lg:gap-4 p-6 lg:p-0">
          <motion.span
            variants={itemVariants}
            className="uppercase text-sm text-accent font-bold tracking-[3px]"
          >
            Listos para acompañar a tu empresa
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl lg:text-4xl text-white md:w-1/2"
          >
            Toma decisiones legales con claridad y seguridad.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white md:w-1/2">
            Agenda una asesoría inicial sin costo y recibe orientación concreta
            para tomar decisiones informadas, prevenir contingencias y actuar
            con respaldo legal.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-4 flex flex-col md:flex-row gap-4"
          >
            <Button variant="white-outline-on-primary" asChild>
              <a href="#reserva-form-section" onClick={handleScrollToForm}>
                Agenda una asesoría
              </a>
            </Button>

            <WhatsappLink text="Contacto directo" />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};
