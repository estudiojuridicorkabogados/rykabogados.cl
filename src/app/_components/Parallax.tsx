"use client";

import { PropsWithChildren } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ParallaxProps {
  yRange: [number, number];
  scaleRange?: [number, number];
  style?: React.CSSProperties;
}

export const Parallax: React.FC<PropsWithChildren<ParallaxProps>> = ({
  children,
  yRange,
  scaleRange = [1, 1],
  style = {},
}) => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], yRange);
  const heroScale = useTransform(scrollYProgress, [0, 1], scaleRange);

  return (
    <motion.div
      className="parallax-body"
      style={{
        ...style,
        y: heroY,
        scale: heroScale,
      }}
    >
      {children}
    </motion.div>
  );
};
