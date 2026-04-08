"use client";

import { motion } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";

import { StepIcon } from "./StepIcon/StepIcon";
import { IStep } from "./types";

interface HablaConNosotrosStepProps {
  step: IStep;
}

export const HablaConNosotrosStep: React.FC<HablaConNosotrosStepProps> = ({
  step,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="bg-gray-60 flex flex-col items-start p-6 rounded-sm w-full h-full gap-6 shadow-md"
      // className="bg-[#fff3e1] flex flex-col items-start p-6 rounded-sm w-full h-full gap-6 shadow-md"
    >
      <StepIcon icon={step.icon} />

      <div className="flex flex-col gap-2 w-full">
        <div className="font-serif text-5xl text-black">{step.stepNumber}</div>

        <div className="font-bold text-black text-xl">{step.title}</div>

        <div className="font-normal text-black">{step.description}</div>
      </div>
    </motion.div>
  );
};
