"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

import { itemVariants } from "@/lib/utils/animations";
import { classNames } from "@/lib/utils/classNames";

import { PressItem } from "./constants";

interface PressImageProps {
  item: PressItem;
  highlighted: boolean;
}

export const PressImage: React.FC<PressImageProps> = ({
  item,
  highlighted,
}) => {
  return (
    <motion.div
      variants={itemVariants}
      className={classNames(
        "absolute shadow-[2px_6px_7px_0px_rgba(0,0,0,0.25)]",
        item.className
      )}
      style={{
        width: "251px",
        height: "309px",
        zIndex: highlighted ? 2 : 1,
      }}
    >
      <Image
        src={item.image}
        alt={`${item.id} press article`}
        width={251}
        height={309}
        loading="lazy"
        className={classNames(
          "z-1 object-cover transition-all duration-150 bg-white overflow-hidden",
          {
            grayscale: !highlighted,
            "scale-105 z-1": highlighted,
          }
        )}
      />
    </motion.div>
  );
};
