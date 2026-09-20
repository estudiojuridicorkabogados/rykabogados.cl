"use client";

import { stagger } from "motion/react";
import * as m from "motion/react-m";

import { Accordion } from "@/components/Accordion/Accordion";
import { itemVariants } from "@/lib/utils/animations";

import { SERVICES } from "./services";

export const OtrasAreasServices = () => {
  return (
    <m.section
      id="hero"
      initial="hidden"
      whileInView="visible"
      className="bg-white py-16 sm:py-24"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="mx-auto flex flex-col gap-12 px-6 lg:max-w-6xl lg:gap-8 lg:px-8 2xl:w-7xl 2xl:max-w-7xl">
        <m.h2 variants={itemVariants} className="text-4xl font-bold text-black">
          Áreas de práctica
        </m.h2>
        {/* <m.p
          variants={itemVariants}
          className="text-lg text-gray-600 lg:w-2/3"
        >
          Ofrecemos una amplia gama de servicios especializados para ayudar a su
          empresa a crecer y prosperar en el competitivo mercado actual. Nuestro
          equipo de abogados expertos en derecho empresarial brinda asesoría
          integral en todas las etapas del ciclo de vida de su negocio, desde la
          constitución hasta la expansión internacional.
        </m.p> */}
      </div>

      <Accordion entries={SERVICES} />
    </m.section>
  );
};
