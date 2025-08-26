"use client";

import { motion } from "motion/react";
import Image from "next/image";

import { containerVariants, itemVariants } from "@/utils/animations";

import andacosinoImage from "../../../../../public/images/andacosino.webp";
import bbclImage from "../../../../../public/images/bbcl.webp";
import meganoticiaImage from "../../../../../public/images/meganoticia.webp";

const BLOCKS = [
  { color: "#222F3F", image: bbclImage },
  { color: "#FED9A5", image: andacosinoImage },
  { color: "#222F3F", image: meganoticiaImage },
];

export const Press = () => {
  return (
    <motion.section
      id="press"
      initial="hidden"
      whileInView="visible"
      className="bg-[#F7F6F6] py-20 lg:py-32"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="px-6 lg:px-0 lg:mx-auto lg:min-w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl flex flex-col gap-8">
        <motion.h2 variants={itemVariants} className="text-black text-3xl lg:text-5xl">
          Lo que hemos conseguido con nuestros clientes
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {BLOCKS.map(({ color, image }, i) => (
            <motion.div
              key={i}
              className="flex items-end justify-center h-[380px] w-full"
              style={{ backgroundColor: color }}
              variants={itemVariants}
            >
              <div className="relative w-3/4 h-5/6">
                <Image src={image} alt="" fill className="object-cover" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
