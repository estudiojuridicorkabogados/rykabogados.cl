"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

import { containerVariants, itemVariants } from "@/lib/utils/animations";

import { PRESS_ITEMS } from "./constants";
import { PressImage } from "./PressImage";
import { PressItem } from "./PressItem";

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
      <div className="lg:mx-auto lg:min-w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="px-6 lg:px-0 space-y-12">
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl md:text-5xl font-semibold text-black"
            >
              Lo que hemos conseguido con nuestros clientes
            </motion.h2>

            <div className="space-y-0">
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

          <div className="overflow-hidden lg:overflow-visible relative flex items-center justify-center w-full lg:w-auto h-[450px] lg:h-full">
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
