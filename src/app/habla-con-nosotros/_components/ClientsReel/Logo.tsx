"use client";


import Image from "next/image";

import { LogoItem } from "./constants";


interface LogoProps {
  logo: LogoItem
  ariaHidden?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  logo,
  ariaHidden,
}) => (
  <div className="relative w-[120px] md:w-[180px] h-[70px] md:h-[100px] flex-shrink-0 opacity-100 transition-opacity duration-300 mr-8 lg:mr-12">
    <Image
      src={logo.src}
      alt={logo.alt}
      className="object-contain"
      fill
      // Provide sizes hint; track width is unbounded but logo height small.
      sizes="(min-width:1024px) 150px, 200px"
      aria-hidden={ariaHidden}
    />
  </div>
);
