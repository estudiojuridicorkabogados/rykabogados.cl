"use client";

import { motion, stagger } from "motion/react";
import Image from "next/image";

import { itemVariants } from "@/lib/utils/animations";

import asesoriaTrabajadoresImage from "../../../../../public/images/asesoria-trabajadores.webp";

import { SERVICES } from "./services";

export const TrabajadoresServices = () => {
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
                01. Tutela laboral
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-1 lg:mt-6 lg:text-lg/8 text-gray-600"
              >
                El Código del Trabajo y la Constitución protegen tus derechos
                fundamentales como trabajador, mereces ser tratado con respeto,
                dignidad y a no ser víctima de acoso o represalias. Para ello la
                ley establece derechos a tu favor que permiten impedir las
                vulneraciones y ser compensado económicamente hasta con 11
                remuneraciones en caso de que dicha vulneración se hubiera
                provocado con ocasión de tu despido, además de tus años de
                servicio.
              </motion.p>
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="hidden md:block w-full relative rounded-xl lg:order-first"
          >
            <Image
              alt="Buildings"
              src={asesoriaTrabajadoresImage}
              fill
              className="w-3xl object-cover rounded-xl shadow-xl"
            />
          </motion.div>
        </div>

        <dl className="mx-auto lg:mt-16 grid max-w-2xl grid-cols-1 gap-12 lg:gap-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
