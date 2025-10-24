"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { LinkedinSquareIcon } from "@/components/icons/LinkedinSquare";
import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { TEAM_MEMBERS } from "@/lib/utils/constants";

export const TeamGrid = () => {
  return (
    <div className="py-16 lg:py-28 bg-primary">
      <motion.div
        className="section-container flex flex-col gap-4"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl lg:text-5xl font-bold text-white leading-tight"
        >
          Conoce a nuestro equipo
        </motion.h2>

        {/* <motion.p
          variants={itemVariants}
          className="lg:text-lg text-white mb-2 lg:max-w-4xl"
        >
          Nuestro equipo de abogados especializados en Derecho Laboral, Civil,
          Societario y de Familia combina experiencia, conocimiento actualizado
          y una visión humana para entregar asesoría integral, preventiva y
          resolutiva. Acompañamos a las empresas en el cumplimiento de la
          normativa laboral y previsional, la gestión de conflictos, auditorías
          y defensa ante fiscalizaciones, además de asesorar en contratos,
          sociedades y reestructuraciones empresariales. Guiados por nuestros
          valores —Excelencia, Lealtad e Integridad— trabajamos con cercanía y
          profesionalismo, ofreciendo resultados sólidos y relaciones de
          confianza duraderas.
        </motion.p> */}

        <ul
          role="list"
          className="mt-8 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
        >
          {TEAM_MEMBERS.map((person, i) => (
            <motion.li key={i} variants={itemVariants}>
              <div className="aspect-14/13 w-full rounded-2xl outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10 relative">
                <Image
                  alt={person.name}
                  src={person.photo}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="rounded-2xl object-cover"
                />
              </div>

              <div className="flex flex-row justify-between gap-3 mt-6">
                <div className="flex flex-col">
                  <h3 className="!font-sans !font-bold text-lg/8 tracking-tight text-white">
                    {person.name}
                  </h3>
                  <p className="text-base/7 text-white/80">{person.role}</p>
                  <a
                    href={person.phoneLink}
                    target="_blank"
                    className="cursor-pointer text-base/7 text-white/80"
                    rel="noreferrer"
                  >
                    {person.phone}
                  </a>
                </div>

                <a
                  href={person.linkedin}
                  target="_blank"
                  className="pt-2"
                  rel="noopener noreferrer"
                >
                  <LinkedinSquareIcon className="h-7 w-7 fill-white/50" />
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};
