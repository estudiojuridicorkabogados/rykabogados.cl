"use client";

import type { Variants } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { WhatsappLink } from "@/components/WhatsappLink/WhatsappLink";
import { trackEvent } from "@/lib/utils/analytics";

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

    trackEvent("rk_cta_click", {
      location: "slogan",
      cta_label: "Agenda una asesoría",
    });

    const element = document.getElementById("reserva-form-section");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <m.section
      initial="hidden"
      whileInView="visible"
      className="relative h-[590px] w-screen overflow-hidden lg:h-[490px]"
      viewport={{ once: true, amount: 0.8 }}
    >
      <Image
        src="/images/heros/rk_advert_banner.webp"
        alt="Oficina de RK Abogados"
        sizes="100vw"
        fill
        className="object-cover"
      />

      <m.div
        variants={containerVariants}
        className="bg-primary/30 absolute right-0 -bottom-1 left-0 flex h-[480px] w-full flex-col justify-center backdrop-blur-2xl lg:h-[390px]"
      >
        <div className="section-container flex w-full flex-col gap-4 p-6 lg:gap-4 lg:p-0">
          <m.span
            variants={itemVariants}
            className="text-accent text-sm font-bold tracking-[3px] uppercase"
          >
            Listos para acompañar a tu empresa
          </m.span>
          <m.h2
            variants={itemVariants}
            className="text-3xl text-white md:w-1/2 lg:text-4xl"
          >
            Toma decisiones legales con claridad y seguridad.
          </m.h2>
          <m.p variants={itemVariants} className="text-white md:w-1/2">
            Agenda una asesoría inicial sin costo y recibe orientación concreta
            para tomar decisiones informadas, prevenir contingencias y actuar
            con respaldo legal.
          </m.p>

          <m.div
            variants={itemVariants}
            className="mt-4 flex flex-col gap-4 md:flex-row"
          >
            <Button variant="white-outline-on-primary" asChild>
              <a href="#reserva-form-section" onClick={handleScrollToForm}>
                Agenda una asesoría
              </a>
            </Button>

            <WhatsappLink location="slogan" text="Contacto directo" />
          </m.div>
        </div>
      </m.div>
    </m.section>
  );
};
