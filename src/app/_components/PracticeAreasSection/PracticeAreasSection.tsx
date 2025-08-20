"use client";

import React from "react";
import { motion, Variants } from "motion/react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { URLS } from "@/utils/constants";

const containerVariants: Variants = {
  hidden: { y: 400 },
  visible: {
    y: 0,
    transition: {
      duration: 1.4,
      ease: "easeOut",
      staggerChildren: 0.5,
      delayChildren: 0.9,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 250 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: "easeOut",
      staggerChildren: 0.5,
      delayChildren: 0.9,
    },
  },
};

export const PracticeAreasSection = () => {
  return (
    <motion.section
      id="areas-de-practica"
      initial="hidden"
      whileInView="visible"
      className="relative w-screen h-[690px] lg:h-[590px] overflow-hidden"
      viewport={{ once: true, amount: 0.8 }}
    >
      <Image
        src="/images/documents.webp"
        alt="Some documents"
        fill
        className="object-cover"
      />

      <motion.div
        variants={containerVariants}
        className="absolute h-[580px] lg:h-[460px] bottom-0 left-0 right-0 w-full bg-primary/30 backdrop-blur-[40px] flex flex-col justify-center"
      >
        <div className="w-full lg:w-6xl lg:max-w-6xl mx-auto flex flex-col gap-4 lg:gap-8 p-6 lg:p-8">
          <span className="uppercase text-sm text-accent font-bold tracking-[3px]">
            Áreas de desempeño
          </span>
          <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-48">
            <PracticeArea
              title="Trabajadores"
              description="Si eres trabajador, tomamos tu caso a resultados, lo que significa que nuestros honorarios se cobrarán exclusivamente sobre la ganancia efectivamente percibida, ¡Sin gastos!"
              link={URLS.asesoriaTrabajadores()}
            />

            <PracticeArea
              title="Empresas"
              description="En R&O ABOGADOS contamos con un equipo de profesionales calificados, comprometidos y dispuestos a entregar una asesoría integral que le permita dar cumplimiento a la normativa laboral y previsional vigente, prevenir infracciones y/o defenderlo ante sanciones, demandas o multas generadas con ocasión del trabajo"
              link={URLS.asesoriaEmpresas()}
            />
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

interface PracticeAreaProps {
  title: string;
  description: string;
  link: string;
}

const PracticeArea: React.FC<PracticeAreaProps> = ({
  title,
  description,
  link,
}) => (
  <motion.div variants={itemVariants} className="flex-1 flex flex-col gap-4">
    <h2 className="text-2xl lg:text-5xl font-bold text-white">{title}</h2>
    <p className="text-sm lg:text-base text-white">{description}</p>

    <Link
      className="uppercase flex items-center font-semibold mt-1 lg:mt-4 text-accent text-xs lg:text-sm gap-3 group"
      href={link as Route}
    >
      Ver más{" "}
      <LongArrowRight className="ml-2 stroke-accent group-hover:animate-wiggle" />
    </Link>
  </motion.div>
);
