import Image from "next/image";

import { classNames } from "@/lib/utils/classNames";

import { HeroContent } from "./HeroContent";

interface HeroSectionProps {
  label: string;
  title: React.ReactElement | string;
  description: React.ReactElement | string;
  className?: string;
  image: {
    src: string;
    alt: string;
  };
  align?: "top" | "center" | "bottom";
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  label,
  title,
  description,
  image,
  className = "",
  align = "bottom",
}) => {
  return (
    <section
      className={classNames([
        // "relative h-screen flex items-center justify-center overflow-hidden",
        "relative h-[calc(100dvh-80px)] lg:h-[calc(100dvh-50px)] flex items-center justify-center overflow-hidden",
        className,
      ])}
    >
      <Image
        priority
        loading="eager"
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className={classNames("object-cover", {
          "object-top-left": align === "top",
          "object-center": align === "center",
          "object-bottom": align === "bottom",
        })}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 from-35% to-black/0" />

      <HeroContent label={label} title={title} description={description} />
    </section>
  );
};
