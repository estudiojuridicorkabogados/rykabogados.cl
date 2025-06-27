"use client";

import { PropsWithChildren } from "react";
import { motion } from "motion/react";

export const MotionWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.25 }}
      className="mx-auto max-w-7xl px-6 lg:px-8"
    >
      {children}
    </motion.div>
  );
};
