"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { containerVariants, itemVariants } from "@/lib/utils/animations";
import { PRESS_ITEMS } from "./constants";
import { PressItem } from "./PressItem";
import { PressImage } from "./PressImage";

export const Press: React.FC = () => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      className="bg-white py-16 lg:py-28"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="px-6 lg:px-0 lg:mx-auto lg:min-w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl md:text-5xl font-semibold text-black"
            >
              Lo que hemos conseguido con nuestros clientes
            </motion.h2>

            <div className="space-y-0 border-y border-black">
              {PRESS_ITEMS.map((item, index) => (
                <PressItem
                  key={item.id}
                  item={item}
                  index={index}
                  onHighlight={setHighlightedIndex}
                />
              ))}
            </div>
          </div>

          <div className="relative h-full flex items-center justify-center">
            {PRESS_ITEMS.map((item, index) => (
              <PressImage
                key={item.id}
                item={item}
                highlighted={highlightedIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
