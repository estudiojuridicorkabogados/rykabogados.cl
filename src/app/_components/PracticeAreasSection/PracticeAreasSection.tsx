"use client";

import React from "react";
import { motion, Variants } from "motion/react";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { LongArrowRight } from "@/components/icons/LongArrowRight";
import { URLS } from "@/lib/utils/constants";

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
      className="relative w-screen h-[1050px] lg:h-[700px] overflow-hidden"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Image
        src="/images/documents.webp"
        sizes="100vw"
        alt="Some documents"
        fill
        className="object-cover"
      />

      <motion.div
        variants={containerVariants}
        className="absolute h-[950px] lg:h-[520px] bottom-0 left-0 right-0 w-full bg-primary/60 backdrop-blur-[50px] flex flex-col justify-center"
      >
        <div className="w-full lg:w-6xl lg:max-w-6xl xl:max-w-7xl 2xl:w-7xl mx-auto flex flex-col gap-4 lg:gap-8 p-6 lg:py-8">
          <span className="uppercase text-sm text-accent font-bold tracking-[3px]">
            Áreas de desempeño
          </span>
          <div className="flex-1 flex flex-col lg:flex-row gap-12 lg:gap-16">
            <PracticeArea
              title="Trabajadores"
              description="En RK Abogados tomamos tu caso a resultado, porque creemos en la justicia y en tu derecho a ser escuchado. Te acompañamos con cercanía y rigor en conflictos laborales de toda índole, desde despidos injustificados hasta negociaciones colectivas, con un enfoque humano, técnico y orientado a soluciones efectivas y sostenibles."
              link={URLS.asesoriaTrabajadores()}
            /> 

            <PracticeArea
              title="Empresas"
              description="En RK Abogados brindamos asesoría laboral y corporativa integral, enfocada en el cumplimiento normativo, la prevención y la gestión eficiente de conflictos. Asistimos a tu organización en contratos, políticas internas y negociaciones colectivas, promoviendo relaciones laborales sólidas y una operación segura y estratégica."
              link={URLS.asesoriaEmpresas()}
            />

            <PracticeArea
              title="Otras Áreas"
              description="En RK Abogados ofrecemos asesoría en materias civiles, comerciales y societarias, entregando soluciones precisas y eficientes. Apoyamos a personas y empresas en la redacción y revisión de contratos, resolución de controversias y procesos de constitución o reorganización, con una visión integral y orientada a resultados duraderos."
              link={URLS.otrasAreas()}
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
  <motion.div variants={itemVariants} className="flex flex-col justify-between gap-4">
    <div className="flex flex-col gap-4">

    <h2 className="text-2xl lg:text-5xl font-bold text-white">{title}</h2>
    <p className="text-sm lg:text-base text-white">{description}</p>
    </div>

    <Link
      className="uppercase flex items-center font-semibold mt-1 lg:mt-4 text-accent text-xs lg:text-sm gap-3 group"
      href={link as Route}
    >
      Ver más{" "}
      <LongArrowRight className="ml-2 stroke-accent group-hover:animate-wiggle" />
    </Link>
  </motion.div>
);
