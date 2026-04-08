"use client";

import { motion } from "motion/react";

import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { SERVICES } from "./constants";

export const ServicesGrid = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col gap-8 lg:gap-12"
    >
      <motion.h2 variants={itemVariants} className="text-3xl lg:text-5xl">
        Servicios
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICES.map((service, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="border border-gray-300 rounded-sm p-6 lg:p-8 bg-transparent flex flex-col gap-6"
          >
            <h3 className="tracking-[2px] uppercase font-semibold! font-sans!">
              {service.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {service.items.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-base font-extralight"
                >
                  <span className="mt-[0.65em] shrink-0 w-1 h-1 rounded-full bg-black" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
