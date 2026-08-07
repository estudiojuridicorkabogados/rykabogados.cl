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
      className="relative h-[1050px] w-screen overflow-hidden lg:h-[700px]"
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
        className="bg-primary/60 absolute right-0 bottom-0 left-0 flex h-[950px] w-full flex-col justify-center backdrop-blur-[50px] lg:h-[520px]"
      >
        <div className="mx-auto flex w-full flex-col gap-4 p-6 lg:w-6xl lg:max-w-6xl lg:gap-8 lg:py-8 xl:max-w-7xl 2xl:w-7xl">
          <span className="text-accent text-sm font-bold tracking-[3px] uppercase">
            Áreas de desempeño
          </span>
          <div className="flex flex-1 flex-col gap-12 lg:flex-row lg:gap-16">
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
  <motion.div
    variants={itemVariants}
    className="flex flex-col justify-between gap-4"
  >
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white lg:text-5xl">{title}</h2>
      <p className="text-sm text-white lg:text-base">{description}</p>
    </div>

    <Link
      className="text-accent group mt-1 flex items-center gap-3 text-xs font-semibold uppercase lg:mt-4 lg:text-sm"
      href={link as Route}
    >
      Ver más{" "}
      <LongArrowRight className="stroke-accent group-hover:animate-wiggle ml-2" />
    </Link>
  </motion.div>
);
