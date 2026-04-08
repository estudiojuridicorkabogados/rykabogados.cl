"use client";

import { motion } from "motion/react";

export const PricesLink = () => {
  const handleScrollToPrices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("prices")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="absolute bottom-0 right-6 lg:right-[max(1.5rem,calc((100vw-72rem)/2))] z-10 overflow-hidden">
      <motion.a
        href="#prices"
        onClick={handleScrollToPrices}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
        className="flex items-center gap-4 bg-[#FED9A5] text-black rounded-t-lg px-6 py-4 lg:px-8 lg:py-3 cursor-pointer"
      >
        <span className="text-xs lg:text-sm tracking-[2px] uppercase font-semibold">
          Planes mensuales desde 11 UF
        </span>

        <svg
          width="9"
          height="18"
          viewBox="0 0 9 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.48927 -1.72753e-07L4.48927 17M4.48927 17L8.44141 13.7347M4.48927 17L0.441406 13.7347"
            stroke="black"
            strokeWidth="1.4"
          />
        </svg>
      </motion.a>
    </div>
  );
};
