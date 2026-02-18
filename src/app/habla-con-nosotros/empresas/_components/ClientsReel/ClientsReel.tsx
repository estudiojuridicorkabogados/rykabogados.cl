"use client";

import Marquee from "react-fast-marquee";

import { LOGOS } from "./constants";
import { Logo } from "./Logo";

export const ClientsReel: React.FC = () => {
  return (
    <div className="bg-accent relative h-[130px] md:h-[120px] flex items-center">
      <Marquee pauseOnHover speed={50}>
        {LOGOS.map((logo, i) => (
          <Logo key={`logo-a-${i}`} logo={logo} />
        ))}
      </Marquee>

      <div className="absolute top-0 left-0 w-24 md:w-[80px] h-full pointer-events-none z-10 bg-linear-to-r from-accent via-accent/80 to-transparent" />

      <div className="absolute top-0 right-0 w-24 md:w-[80px] h-full pointer-events-none z-10 bg-linear-to-r from-transparent via-accent/80 to-accent" />
    </div>
  );
};
