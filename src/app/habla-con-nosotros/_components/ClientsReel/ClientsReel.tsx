"use client";

import Image, { StaticImageData } from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";

import artimatebImage from "../../../../../public/images/clients/artimateb.webp";
import capitalvivoImage from "../../../../../public/images/clients/capitalvivo.webp";
import cemImage from "../../../../../public/images/clients/cem.webp";
import certigasImage from "../../../../../public/images/clients/certigas.webp";
import comfrutImage from "../../../../../public/images/clients/comfrut.webp";
import criteriaImage from "../../../../../public/images/clients/criteria.webp";
import dukoImage from "../../../../../public/images/clients/duko.webp";
import hol3Image from "../../../../../public/images/clients/hol3.webp";
import incosekImage from "../../../../../public/images/clients/incosek.webp";
import latImage from "../../../../../public/images/clients/lat.webp";
import mueblistaImage from "../../../../../public/images/clients/mueblista.webp";
import multitierraImage from "../../../../../public/images/clients/multitierra.webp";
import pelomingegneriaImage from "../../../../../public/images/clients/pelomingegneria.webp";
import subusImage from "../../../../../public/images/clients/subus.webp";

interface LogoItem {
  src: StaticImageData;
  alt: string;
}

const logos: LogoItem[] = [
  { src: cemImage, alt: "Cliente CEM" },
  { src: criteriaImage, alt: "Cliente Criteria" },
  { src: incosekImage, alt: "Cliente Incosek" },
  { src: multitierraImage, alt: "Cliente Multitierra" },
  { src: subusImage, alt: "Cliente Subus" },
  { src: comfrutImage, alt: "Cliente Comfrut" },
  { src: pelomingegneriaImage, alt: "Cliente Pelo Mingenería" },
  { src: certigasImage, alt: "Cliente Certigas" },
  { src: dukoImage, alt: "Cliente Duko" },
  { src: latImage, alt: "Cliente LAT" },
  { src: capitalvivoImage, alt: "Cliente Capital Vivo" },
  { src: artimatebImage, alt: "Cliente Artimateb" },
  { src: mueblistaImage, alt: "Cliente Mueblista" },
  { src: hol3Image, alt: "Cliente Hol3" },
];

export const ClientsReel = ({ speed = 60, direction = "left" }: { speed?: number; direction?: "left" | "right" }) => {
  const prefersReducedMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cycleRef = useRef<HTMLDivElement | null>(null);
  const [cycleWidth, setCycleWidth] = useState(0);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  // Measure width of one cycle (one full set of logos)
  useLayoutEffect(() => {
    const measure = () => {
      if (!cycleRef.current) return;
      const w = cycleRef.current.getBoundingClientRect().width;
      if (w && w !== cycleWidth) setCycleWidth(w);
    };
    measure();
    const ro = cycleRef.current ? new ResizeObserver(measure) : null;
    if (cycleRef.current && ro) ro.observe(cycleRef.current);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro?.disconnect();
    };
  }, [cycleWidth]);

  useAnimationFrame((_, delta) => {
    if (paused || prefersReducedMotion || cycleWidth === 0) return;
    const dir = direction === "left" ? -1 : 1;
    const deltaPx = (speed * delta) / 1000 * dir; // px this frame
    const current = x.get();
    let next = current + deltaPx;
    // Use modulo wrap to avoid frame overshoot induced jump.
    if (direction === "left") {
      // Keep next in [-cycleWidth, 0)
      if (next <= -cycleWidth) {
        // modulo accounting for large deltas (unlikely but safe)
        next = ((next % cycleWidth) + cycleWidth) % cycleWidth - cycleWidth; // ensures negative range
      }
    } else {
      // right direction: keep in (0, cycleWidth]
      if (next >= cycleWidth) {
        next = next % cycleWidth;
      }
    }
    x.set(next);
  });

  return (
    <div
      className="relative w-full overflow-hidden py-12"
      aria-label="Clientes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        ref={trackRef}
        className="flex select-none"
        style={{ x }}
        aria-hidden={prefersReducedMotion ? undefined : true}
      >
        {/* One cycle */}
        <div ref={cycleRef} className="flex gap-12 md:gap-32 items-center">
          {logos.map((logo, i) => (
            <Logo key={`logo-a-${i}`} {...logo} />
          ))}
        </div>
        {/* Clone cycle (must be identical width) */}
        {/* <div className="flex gap-12 md:gap-32 items-center" aria-hidden>
          {logos.map((logo, i) => (
            <Logo key={`logo-b-${i}`} {...logo} ariaHidden />
          ))}
        </div> */}
      </motion.div>
    </div>
  );
};

const Logo: React.FC<LogoItem & { ariaHidden?: boolean }> = ({
  src,
  alt,
  ariaHidden,
}) => (
  <div className="relative flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-300">
    <Image
      src={src}
      alt={alt}
      className="h-12 w-auto md:h-18 object-contain"
      // Provide sizes hint; track width is unbounded but logo height small.
      sizes="(min-width:1024px) 150px, 120px"
      aria-hidden={ariaHidden}
    />
  </div>
);
