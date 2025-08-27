"use client";

import { motion, stagger } from "motion/react";
import Image from "next/image";

import { Accordion } from "@/components/Accordion/Accordion";
import { itemVariants } from "@/lib/utils/animations";

import asesoriaEmpresasImage from "../../../../../public/images/assoria-empresas.webp";

import { SERVICES } from "./services";

export const EmpresasServices = () => {
  return (
    <motion.section
      id="hero"
      initial="hidden"
      whileInView="visible"
      className="bg-white py-16 sm:py-24"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="flex flex-col gap-12 lg:gap-8 mx-auto lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl px-6 lg:px-8">
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-black"
        >
          Nuestros Servicios para Empresas
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 lg:w-2/3"
        >
          Ofrecemos una amplia gama de servicios especializados para ayudar a su
          empresa a crecer y prosperar en el competitivo mercado actual. Nuestro
          equipo de abogados expertos en derecho empresarial brinda asesoría
          integral en todas las etapas del ciclo de vida de su negocio, desde la
          constitución hasta la expansión internacional.
        </motion.p>
      </div>

      <Accordion entries={SERVICES} />
    </motion.section>
  );
};
