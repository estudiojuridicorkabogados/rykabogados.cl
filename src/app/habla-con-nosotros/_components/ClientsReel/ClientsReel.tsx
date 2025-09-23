"use client";

import Marquee from "react-fast-marquee";

import { LOGOS } from "./constants";
import { Logo } from "./Logo";

export const ClientsReel: React.FC = () => {
  return (
    <div className="bg-primary relative h-[130px] md:h-[160px] flex items-center">
      <Marquee pauseOnHover speed={90}>
        {LOGOS.map((logo, i) => (
          <Logo key={`logo-a-${i}`} logo={logo} />
        ))}
      </Marquee>

      <div className="absolute top-0 left-0 w-24 md:w-[150px] h-full pointer-events-none z-10 bg-gradient-to-r from-primary via-primary/80 to-transparent" />

      <div className="absolute top-0 right-0 w-24 md:w-[150px] h-full pointer-events-none z-10 bg-gradient-to-r from-transparent via-primary/80 to-primary" />
    </div>
  );
};
