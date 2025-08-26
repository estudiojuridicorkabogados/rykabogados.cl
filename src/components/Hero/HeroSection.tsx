import Image from "next/image";

import { HeroContent } from "./HeroContent";

interface HeroSectionProps {
  label: string;
  title: React.ReactElement | string;
  description: React.ReactElement | string;
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
}) => {
  return (
    <section className="relative h-[calc(100dvh-80px)] lg:h-[calc(100dvh-100px)] flex items-center justify-center overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <HeroContent label={label} title={title} description={description} />
    </section>
  );
};
