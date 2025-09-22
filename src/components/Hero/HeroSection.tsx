import Image from "next/image";

import { HeroContent } from "./HeroContent";
import { classNames } from "@/lib/utils/classNames";

interface HeroSectionProps {
  label: string;
  title: React.ReactElement | string;
  description: React.ReactElement | string;
  className?: string;
  image: {
    src: string;
    alt: string;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  label,
  title,
  description,
  image,
  className = ''
}) => {
  return (
    <section
      className={classNames([
        "relative h-[calc(100dvh-80px)] lg:h-[calc(100dvh-100px)] flex items-center justify-center overflow-hidden",
        className
      ])}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover object-bottom-left"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <HeroContent label={label} title={title} description={description} />
    </section>
  );
};
