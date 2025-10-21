import Image from "next/image";

import tribunal from "../../../../public/images/heros/bandera-chile.webp";
import santiagoImage from "../../../../public/images/santiago.webp";

import { TESTIMONIALS } from "./constants";
import { TestimonalsCarousel } from "./TestimonialsCarousel";

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="testimonios"
      className="relative w-screen h-[590px] lg:h-[570px] bg-[#0B142D] text-white overflow-hidden "
    >
      <Image
        src={tribunal}
        alt="Tribunal de Justicia"
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute top-1/2 left-3 right-3 lg:right-auto lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2 h-[350px] lg:h-[290px] bg-primary/20  backdrop-blur-xl rounded-2xl">
        <TestimonalsCarousel
          title="Lo que dicen nuestro clientes"
          testimonials={TESTIMONIALS}
        />
      </div>
    </section>
  );
};
