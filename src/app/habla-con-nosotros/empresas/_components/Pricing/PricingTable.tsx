"use client";

import * as m from "motion/react-m";

import { containerVariants, itemVariants } from "@/lib/utils/animations";

import { PLANS } from "./constants";

export const PricingTable = () => {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
      className="flex flex-col gap-8 lg:gap-12"
    >
      <div className="flex flex-col gap-2 lg:gap-8">
        <m.h2 variants={itemVariants} className="text-3xl lg:text-5xl">
          Tarifas y Planes
        </m.h2>

        <m.p variants={itemVariants} className="lg:w-1/3">
          Acompañamos a tu empresa en la definición de estrategias legales
          claras, preventivas y alineadas con tus objetivos.
        </m.p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-separate border-spacing-0">
          <m.thead variants={itemVariants}>
            <tr>
              <th className="border-b border-black py-4 pr-6 text-left font-sans text-sm font-medium tracking-[2px] uppercase">
                Plan
              </th>
              <th className="border-b border-black px-6 py-4 text-center font-sans text-sm font-medium tracking-[2px] uppercase">
                Horas Mensuales
              </th>
              <th className="border-b border-black px-6 py-4 text-center font-sans text-sm font-medium tracking-[2px] uppercase">
                Valor Mensual
              </th>
              <th className="border-b border-black px-6 py-4 text-center font-sans text-sm font-medium tracking-[2px] uppercase">
                Valor Hora
              </th>
              <th className="border-b border-black py-4 pl-6 text-center font-sans text-sm font-medium tracking-[2px] uppercase">
                Valor Hora Aditional
              </th>
            </tr>
          </m.thead>
          <tbody>
            {PLANS.map((plan, i) => (
              <m.tr
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
                <td className="border-b border-black py-5 pr-6">
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-sm font-semibold tracking-[2px] uppercase">
                      {plan.name}
                    </span>
                    {plan.featured && (
                      <span className="rounded-sm bg-[#FED9A5] px-2 py-0.5 font-sans text-[10px] font-semibold tracking-[3px] text-[#222F3F] uppercase">
                        Más Contratado
                      </span>
                    )}
                  </div>
                </td>
                <td className="border-b border-black px-6 py-5 text-center font-sans text-sm font-medium tracking-[2px] uppercase">
                  {plan.hours}
                </td>
                <td className="border-b border-black px-6 py-5 text-center font-sans text-sm font-medium tracking-[2px] uppercase">
                  {plan.monthlyValue}
                </td>
                <td className="border-b border-black px-6 py-5 text-center font-sans text-sm font-medium tracking-[2px] uppercase">
                  {plan.hourValue}
                </td>
                <td className="border-b border-black py-5 pl-6 text-center font-sans text-sm font-medium tracking-[2px] uppercase">
                  {plan.additionalHour}
                </td>
              </m.tr>
            ))}
          </tbody>
        </table>
      </div>
    </m.div>
  );
};
