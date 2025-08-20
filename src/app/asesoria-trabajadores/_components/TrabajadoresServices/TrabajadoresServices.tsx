"use client";

import { motion,stagger } from "motion/react";
import Image from "next/image";

import { itemVariants } from "@/utils/animations";

import cityImage from "../../../../../public/images/city.jpg";

import { SERVICES } from "./services";

export const TrabajadoresServices = () => {
  return (
    <motion.section
      id="hero"
      initial="hidden"
      whileInView="visible"
      className="bg-white py-24 sm:py-32"
      transition={{
        delayChildren: stagger(0.3),
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex flex-col gap-8 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:ml-auto lg:pl-4">
            <div className="lg:max-w-lg">
              <motion.span variants={itemVariants} className="font-semibold text-accent-dark uppercase text-sm">
                Nuestra experiencia
              </motion.span>
              <motion.h1 variants={itemVariants} className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-black sm:text-5xl">
                Tutela laboral
              </motion.h1>
              <motion.p variants={itemVariants} className="mt-6 text-lg/8 text-gray-600">
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

          <motion.div  variants={itemVariants} className="w-full relative rounded-xl lg:order-first">
            <Image
              alt="Buildings"
              src={cityImage}
              fill
              className="w-3xl object-cover rounded-xl shadow-xl"
            />
          </motion.div>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {SERVICES.map((service) => (
            <motion.div variants={itemVariants} key={service.title}>
              <dt className="font-semibold text-black ">{service.title}</dt>
              <dd className="mt-1 text-gray-600">{service.description}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </motion.section>
  );
};
