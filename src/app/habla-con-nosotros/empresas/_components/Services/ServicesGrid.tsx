"use client";

import * as m from "motion/react-m";

import { containerVariants, itemVariants } from "@/lib/utils/animations";

import { SERVICES } from "./constants";

export const ServicesGrid = () => {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col gap-8 lg:gap-12"
    >
      <m.h2 variants={itemVariants} className="text-3xl lg:text-5xl">
        Servicios
      </m.h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {SERVICES.map((service, i) => (
          <m.div
            key={i}
            variants={itemVariants}
            className="flex flex-col gap-6 rounded-sm border-[0.5px] border-black/20 bg-transparent p-6 lg:p-8"
          >
            <h3 className="font-sans! text-sm font-semibold! tracking-[2px] uppercase">
              {service.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {service.items.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2 text-sm font-extralight"
                >
                  <span className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-black" />
                  {item}
                </li>
              ))}
            </ul>
          </m.div>
        ))}
      </div>
    </m.div>
  );
};
