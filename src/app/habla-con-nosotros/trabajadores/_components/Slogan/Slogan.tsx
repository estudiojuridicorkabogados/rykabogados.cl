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
      className="relative h-[590px] w-screen overflow-hidden lg:h-[490px]"
      viewport={{ once: true, amount: 0.8 }}
    >
      <Image
        src="/images/heros/library.webp"
        alt="Some documents"
        sizes="100vw"
        fill
        className="object-cover"
      />

      <motion.div
        variants={containerVariants}
        className="bg-primary/30 absolute right-0 -bottom-1 left-0 flex h-[480px] w-full flex-col justify-center backdrop-blur-2xl lg:h-[390px]"
      >
        <div className="section-container flex w-full flex-col gap-4 p-6 lg:gap-4 lg:p-0">
          <motion.span
            variants={itemVariants}
            className="text-accent text-sm font-bold tracking-[3px] uppercase"
          >
            Listos para evaluar tu caso
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl text-white lg:text-4xl"
          >
            Defendemos tu derechos como si fueran nuestros.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white">
            Agenda una consulta gratuita por llamada, videollamada o contáctanos
            directamente por WhatsApp para recibir atención inmediata.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-4 flex flex-col gap-4 md:flex-row"
          >
            <Button variant="reserva-form-link" asChild>
              <a href="#reserva-form-section" onClick={handleScrollToForm}>
                Agenda una asesoría
              </a>
            </Button>

            <WhatsappLink />
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};
