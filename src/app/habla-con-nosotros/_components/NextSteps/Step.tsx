"use client";

import { motion } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";

import { IStep } from "./constants";
import { StepIcon } from "./StepIcon";

interface StepProps {
  step: IStep;
}

export const Step: React.FC<StepProps> = ({ step }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-[#fff3e1] flex flex-col items-start p-6 rounded-sm flex-1 h-full gap-6"
    >
      <StepIcon icon={step.icon} />

      <div className="flex flex-col gap-2 w-full">
        <div className="font-serif text-5xl text-black">{step.stepNumber}</div>

        <div className="font-bold text-black text-xl">
          {step.title}
        </div>

        <div className="font-normal text-black">
          {step.description}
        </div>
      </div>
    </motion.div>
  );
};
