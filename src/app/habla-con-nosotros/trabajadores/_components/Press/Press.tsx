"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

import { Accordion } from "@/components/Accordion/Accordion";
import { containerVariants, itemVariants } from "@/lib/utils/animations";

import { PRESS_ITEMS } from "./constants";
import { PressImage } from "./PressImage";

export const Press: React.FC = () => {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const handleHoverEnd = (index: number) => {
    if (highlightedIndex === index) {
      setHighlightedIndex(null);
    }
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      className="bg-white py-16 lg:min-h-[690px] lg:py-28"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="space-y-12 px-0">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-semibold text-black md:text-5xl lg:text-4xl"
            >
              Lo que hemos conseguido con nuestros clientes
            </motion.h2>

            <div className="space-y-0">
              <Accordion
                entries={PRESS_ITEMS}
                fixedSize={false}
                showNumbers={false}
                fullSizeText
                onHoverStart={setHighlightedIndex}
                onHoverEnd={handleHoverEnd}
              />
            </div>
          </div>

          <div className="relative flex h-[450px] w-full items-center justify-center overflow-hidden lg:h-full lg:w-auto lg:overflow-visible">
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
