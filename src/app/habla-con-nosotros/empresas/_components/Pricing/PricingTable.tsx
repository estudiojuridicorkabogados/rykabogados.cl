"use client";

import { motion } from "motion/react";

import { containerVariants, itemVariants } from "@/lib/utils/animations";

import { PLANS } from "./constants";

export const PricingTable = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col gap-8 lg:gap-12"
    >
      <div className="flex flex-col gap-2 lg:gap-8">
        <motion.h2 variants={itemVariants} className="text-3xl lg:text-5xl">
          Tarifas y Planes
        </motion.h2>

        <motion.p variants={itemVariants} className="lg:w-1/3">
          Acompañamos a tu empresa en la definición de estrategias legales
          claras, preventivas y alineadas con tus objetivos.
        </motion.p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-separate border-spacing-0">
          <motion.thead variants={itemVariants}>
            <tr>
              <th className="py-4 pr-6 text-left text-sm tracking-[2px] uppercase font-medium font-sans border-b border-black">
                Plan
              </th>
              <th className="py-4 px-6 text-center text-sm tracking-[2px] uppercase font-medium font-sans border-b border-black">
                Horas Mensuales
              </th>
              <th className="py-4 px-6 text-center text-sm tracking-[2px] uppercase font-medium font-sans border-b border-black">
                Valor Mensual
              </th>
              <th className="py-4 px-6 text-center text-sm tracking-[2px] uppercase font-medium font-sans border-b border-black">
                Valor Hora
              </th>
              <th className="py-4 pl-6 text-center text-sm tracking-[2px] uppercase font-medium font-sans border-b border-black">
                Valor Hora Aditional
              </th>
            </tr>
          </motion.thead>
          <tbody>
            {PLANS.map((plan, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.4 + i * 0.1,
                }}
                className={
                  plan.featured
                    ? "bg-[linear-gradient(90deg,transparent_0%,#FED9A5_60%,#FED9A5_70%,transparent_100%)]"
                    : ""
                }
              >
                <td className="py-5 pr-6 border-b border-black">
                  <div className="flex items-center gap-3">
                    <span className="text-sm tracking-[2px] uppercase font-semibold font-sans">
                      {plan.name}
                    </span>
                    {plan.featured && (
                      <span className="text-[10px] tracking-[3px] uppercase font-semibold font-sans bg-[#FED9A5] text-[#222F3F] px-2 py-0.5 rounded-sm">
                        Más Contratado
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-5 px-6 text-center text-sm tracking-[2px] uppercase font-medium font-sans border-b border-black">
                  {plan.hours}
                </td>
                <td className="py-5 px-6 text-center text-sm tracking-[2px] uppercase font-medium font-sans border-b border-black">
                  {plan.monthlyValue}
                </td>
                <td className="py-5 px-6 text-center text-sm tracking-[2px] uppercase font-medium font-sans border-b border-black">
                  {plan.hourValue}
                </td>
                <td className="py-5 pl-6 text-center text-sm tracking-[2px] uppercase font-medium font-sans border-b border-black">
                  {plan.additionalHour}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
