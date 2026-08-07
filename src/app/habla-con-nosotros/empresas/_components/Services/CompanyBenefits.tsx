"use client";

import { motion } from "motion/react";

import { containerVariants, itemVariants } from "@/lib/utils/animations";

import { BENEFITS } from "./constants";

export const CompanyBenefits = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col gap-8 rounded-sm bg-[#FFF3E1] px-8 py-10 shadow-sm lg:gap-12 lg:px-12 lg:pt-10 lg:pb-14"
    >
      <motion.h2 variants={itemVariants} className="text-3xl font-semibold">
        Lo que realmente obtiene tu empresa
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 2xl:grid-cols-5">
        {BENEFITS.map((benefit, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="flex flex-row items-start gap-4"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FED9A5]">
              <Checkbox />
            </div>
            <p className="font-sans! text-sm leading-snug font-normal lg:text-sm">
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
