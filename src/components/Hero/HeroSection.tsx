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
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  label,
  title,
  description,
  image,
  className = "",
}) => {
  return (
    <section
      className={classNames([
        "relative h-[calc(100dvh-80px)] lg:h-[calc(100dvh-100px)] flex items-center justify-center overflow-hidden",
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
        className="object-cover object-bottom-left"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <HeroContent label={label} title={title} description={description} />
    </section>
  );
};
