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
      className="flex flex-col space-y-1 border-black py-4 border-t last:border-b group cursor-pointer"
      onMouseEnter={() => onHighlight(index)}
      onMouseLeave={() => onHighlight(null)}
    >
      <h3 className="font-sans! font-medium! text-black text-lg">
        {item.title}
      </h3>

      <div className="lg:text-sm text-black">
        <span className="font-bold">{item.publication} - </span>
        <span className="font-normal">{item.date}</span>
      </div>

      <div className="group-hover:mt-4 group-hover:mb-2 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden font-sans text-base text-black flex flex-col gap-2 text-black/50">
          {item.description}
        </div>
      </div>
    </motion.div>
  );
};
