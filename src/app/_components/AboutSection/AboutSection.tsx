"use client";

import { motion } from "motion/react";

import { Button } from "@/components/ui/Button";
import { containerVariants, itemVariants } from "@/utils/animations";

import { Stats } from "./Stats";



export const AboutSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-24 items-start">
        <motion.div
          className="flex flex-col gap-6 flex-1"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-[#0B142D] leading-tight"
          >
            RyK Abogados
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 leading-relaxed mb-8"
          >
            Retamales Kowalsky Abogados es un estudio jurídico que ofrece sus
            servicios a lo largo de todo Chile, conformado por un equipo de
            abogados especializados que resuelven asuntos jurídicos
            principalmente en el área del derecho laboral y cuyas estrategias
            son discutidas y analizadas en conjunto, combinando las habilidades,
            experiencia y competencias de cada uno de sus profesionales, con
            excelentes y comprobables resultados..
          </motion.p>

          <motion.div variants={itemVariants}>
            <Button className="w-fit" variant="default" size="lg" animateOnClick>
              Contáctanos
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex h-full flex-1 pt-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <Stats title="Trabajadores" value={500} />
          <Stats title="Empresas" value={120} />
        </motion.div>
      </div>
    </section>
  );
};
