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
  <div className="relative flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300 mr-12 lg:mr-20">
    <Image
      src={logo.src}
      alt={logo.alt}
      className="h-24 w-auto md:h-32 object-contain"
      // Provide sizes hint; track width is unbounded but logo height small.
      sizes="(min-width:1024px) 150px, 120px"
      aria-hidden={ariaHidden}
    />
  </div>
);
