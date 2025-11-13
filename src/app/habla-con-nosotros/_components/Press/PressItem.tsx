"use client";

import { motion } from "motion/react";

import { itemVariants } from "@/lib/utils/animations";

import { PressItem as IPressItem } from "./constants";

interface PressItemProps {
  item: IPressItem;
  index: number;
  onHighlight: (index: number | null) => void;
}

export const PressItem: React.FC<PressItemProps> = ({
  item,
  index,
  onHighlight,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col space-y-1 border-black py-4 border-t last:border-b group"
      onMouseEnter={() => onHighlight(index)}
      onMouseLeave={() => onHighlight(null)}
    >
      <div className="lg:text-xl text-black">
        <span className="font-bold">{item.publication} - </span>
        <span className="font-normal">{item.date}</span>
      </div>

      <span className="font-medium text-black text-lg">{item.title}</span>

      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden font-sans text-base text-black">
          {item.description}
        </div>
      </div>
    </motion.div>
  );
};
