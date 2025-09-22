"use client";

import { motion } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";
import { PressItem as IPressItem } from "./constants";

interface PressItemProps {
  item: IPressItem;
  index: number;
  onHighlight: (index: number | null) => void;
}

export const PressItem: React.FC<PressItemProps> = ({ item, index, onHighlight }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col space-y-2 border-b border-black py-8 last:border-0"
      onMouseEnter={() => onHighlight(index)}
      onMouseLeave={() => onHighlight(null)}
    >
      <div className="text-xl text-black">
        <span className="font-bold">{item.publication} - </span>
        <span className="font-normal">{item.date}</span>
      </div>

      <p className="font-sans text-xl text-black">
        {item.description}
      </p>
    </motion.div>
  );
};
