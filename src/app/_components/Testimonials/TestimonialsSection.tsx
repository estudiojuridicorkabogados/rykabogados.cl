import Image from "next/image";

import tribunal from "../../../../public/images/heros/bandera-chile.webp";

import { TESTIMONIALS } from "./constants";
import { TestimonialsCarouselLoader } from "./TestimonialsCarouselLoader";

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonios"
      className="relative h-[590px] w-screen overflow-hidden bg-[#0B142D] text-white lg:h-[570px]"
    >
      <Image
        src={tribunal}
        alt="Bandera de Chile flameando"
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="bg-primary/20 absolute top-1/2 right-3 left-3 h-[350px] -translate-y-1/2 transform rounded-2xl backdrop-blur-xl lg:right-auto lg:left-1/2 lg:h-[290px] lg:-translate-x-1/2">
        <TestimonialsCarouselLoader
          title="Lo que dicen nuestro clientes"
          testimonials={TESTIMONIALS}
        />
      </div>
    </section>
  );
};
