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
          className="mt-8 mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
        >
          {TEAM_MEMBERS.map((person, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className="bg-white/5 rounded-2xl border-white/10 border"
            >
              <div className="aspect-14/13 w-full rounded-2xl outline-1 -outline-offset-1 outline-black/5 dark:outline-white/10 relative">
                <Image
                  alt={person.name}
                  src={person.photo}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="rounded-t-2xl object-cover"
                />
              </div>

              <div className="flex flex-row justify-between gap-3 my-5 w-full px-5">
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex flex-row items-center justify-between gap-3 w-full">
                    <h3 className="font-sans! font-bold! text-base text-white">
                      {person.name}
                    </h3>
                  </div>

                  <p className="text-white/80 text-sm italic mb-4">
                    {person.role}
                  </p>

                  <a
                    href={`mailto:${person.email}`}
                    target="_blank"
                    className="cursor-pointer text-sm text-white/80 hover:text-accent transition-colors duration-300"
                    rel="noreferrer"
                  >
                    {person.email}
                  </a>
                  <a
                    href={person.phoneLink}
                    target="_blank"
                    className="cursor-pointer text-sm text-white/80 mb-2 hover:text-accent transition-colors duration-300"
                    rel="noreferrer"
                  >
                    {person.phone}
                  </a>

                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedinSquareIcon className="size-5 fill-white/50 hover:fill-accent transition-colors duration-300" />
                  </a>

                  {/* <a
                    href={`https://wa.me/${person.phone.replace("+56 ", "")}`}
                    target="_blank"
                    className="cursor-pointer text-base/7 text-white/80"
                    rel="noreferrer"
                  >
                    <WhatsappIcon className="h-7 w-7 fill-white/50" />
                  </a> */}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};
