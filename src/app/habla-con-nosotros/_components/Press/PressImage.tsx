"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { itemVariants } from "@/lib/utils/animations";
import { PressItem } from "./constants";
import { classNames } from "@/lib/utils/classNames";

interface PressImageProps {
  item: PressItem;
  highlighted: boolean;
}

export const PressImage: React.FC<PressImageProps> = ({ item, highlighted }) => {
  return (
    <motion.div
      variants={itemVariants}
      className={`absolute ${item.className} shadow-[2px_6px_7px_0px_rgba(0,0,0,0.25)]`}
      style={{
        width: "251px",
        height: "309px",
        zIndex: 3,
      }}
    >
      <div className={classNames("relative w-full h-full bg-white overflow-hidden transition-all duration-150", {
          'border border-accent scale-105': highlighted,
      })}>
        <Image
          src={item.image}
          alt={`${item.publication} article`}
          fill
          className={classNames("object-cover transition-all duration-150", {
             'grayscale': !highlighted,
             "scale-105": highlighted,
          })}
        />
      </div>
    </motion.div>
  );
};
