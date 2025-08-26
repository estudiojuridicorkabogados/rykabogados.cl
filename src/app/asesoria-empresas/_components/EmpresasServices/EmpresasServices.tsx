"use client";

import { motion, stagger } from "motion/react";
import Image from "next/image";

import { itemVariants } from "@/lib/utils/animations";

import asesoriaEmpresasImage from "../../../../../public/images/assoria-empresas.webp";

import { SERVICES } from "./services";

export const EmpresasServices = () => {
  return (
    <motion.section
      id="hero"
      initial="hidden"
      whileInView="visible"
      className="bg-white py-16 sm:py-32"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="flex flex-col gap-12 lg:gap-8 mx-auto lg:max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4">
            <div className="lg:max-w-lg">
              <motion.h1
                variants={itemVariants}
                className="mt-2 text-xl lg:text-4xl font-semibold tracking-tight text-pretty text-black sm:text-5xl"
              >
                01. Contestación de demandas laborales
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-1 lg:mt-6 lg:text-lg/8 text-gray-600"
              >
                Es habitual que durante el desarrollo de la actividad de una
                empresa surjan conflictos jurídico-laborales con los
                trabajadores o incluso con la Dirección del Trabajo, que hacen
                necesario contar con asesoría jurídica oportuna y eficaz.
                Nuestro equipo se hará cargo de todo el proceso, desde la
                notificación de la acción, implementación de la estrategia y
                seguimiento del proceso hasta la sentencia, respetando
                estrictamente los plazos judiciales y ejerciendo todos los
                derechos que la ley confiere para obtener los resultados
                esperados.
              </motion.p>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="hidden md:block w-full relative rounded-xl lg:order-first"
          >
            <Image
              alt="Buildings"
              src={asesoriaEmpresasImage}
              fill
              className="w-3xl object-cover rounded-xl shadow-xl"
            />
          </motion.div>
        </div>

        <dl className="mx-auto lg:mt-16 grid max-w-2xl grid-cols-1 gap-12 lg:gap-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {SERVICES.map((service, i) => (
            <motion.div variants={itemVariants} key={service.title}>
              <h5 className="font-semibold text-black text-xl">
                {`0${i + 2}.`} {service.title}
              </h5>
              <dd className="mt-1 text-gray-600">{service.description}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </motion.section>
  );
};
