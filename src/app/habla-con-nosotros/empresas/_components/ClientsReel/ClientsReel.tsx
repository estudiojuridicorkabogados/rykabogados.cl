"use client";

import Marquee from "react-fast-marquee";

import { LOGOS } from "./constants";
import { Logo } from "./Logo";

export const ClientsReel: React.FC = () => {
  return (
    <div className="bg-accent relative flex h-[130px] items-center md:h-[120px]">
      <Marquee pauseOnHover speed={50}>
        {LOGOS.map((logo, i) => (
          <Logo key={`logo-a-${i}`} logo={logo} />
        ))}
      </Marquee>

      <div className="from-accent via-accent/80 pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-linear-to-r to-transparent md:w-[80px]" />

      <div className="via-accent/80 to-accent pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-linear-to-r from-transparent md:w-[80px]" />
    </div>
  );
};
