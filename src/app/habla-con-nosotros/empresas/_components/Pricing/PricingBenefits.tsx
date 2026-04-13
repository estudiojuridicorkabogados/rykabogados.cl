"use client";

import { motion } from "motion/react";

import { containerVariants, itemVariants } from "@/lib/utils/animations";

import { PRICING_BENEFITS } from "./constants";

export const PricingBenefits = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col lg:flex-row gap-8 lg:gap-16 bg-white rounded-sm px-8 py-10 lg:px-12 lg:py-12 shadow-sm"
    >
      <motion.h2 variants={itemVariants} className="text-3xl shrink-0 lg:w-56">
        Un servicio jurídico flexible y trasparente
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {PRICING_BENEFITS.map((benefit, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex flex-row items-start gap-4"
          >
            <div className="shrink-0 w-9 h-9 rounded-full bg-[#FED9A5] flex items-center justify-center">
              <Checkbox />
            </div>
            <p className="text-sm leading-snug font-sans! font-normal pt-1">
              {benefit}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Checkbox = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 7.5L6.5 12L13.5 1.5"
        stroke="#222F3F"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
