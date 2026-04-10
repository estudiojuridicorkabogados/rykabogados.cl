"use client";

import { motion } from "motion/react";

export const PricesLink = () => {
  const handleScrollToPrices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("prices")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
      className="absolute -bottom-4 lg:right-[max(1.5rem,calc((100vw-72rem)/2))] z-10"
    >
      <a
        href="#prices"
        onClick={handleScrollToPrices}
        className="flex items-center gap-1 bg-[#FED9A5] text-black rounded-t-lg px-4 lg:px-8 pt-2 lg:pt-4 pb-5 lg:pb-6 cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-2"
      >
        <span className="text-xs lg:text-sm tracking-[2px] uppercase font-semibold">
          Planes mensuales desde 11 UF
        </span>

        <svg
          width="9"
          height="18"
          viewBox="0 0 9 18"
          fill="none"
          className="w-2 h-3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.48927 -1.72753e-07L4.48927 17M4.48927 17L8.44141 13.7347M4.48927 17L0.441406 13.7347"
            stroke="black"
            strokeWidth="1.4"
          />
        </svg>
      </a>
    </motion.div>
  );
};
