import Image from "next/image";

// import santiagoImage from "../../../../public/images/santiago.webp";
import santiagoImage from "../../../../public/images/santiago-2.jpg";


import { TestimonalsCarousel } from "./TestimonialsCarousel";
import { Testimonial } from "./types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
}) => {
  return (
    <section
      id="testimonios"
      className="relative w-screen h-[590px] lg:h-[570px] bg-[#0B142D] text-white overflow-hidden "
    >
      <Image
        src={santiagoImage}
        alt="Santiago del Chile"
        fill
        sizes="100vw"
        className="object-cover object-top scale-105"
      />

      <div className="absolute top-1/2 left-3 right-3 lg:right-auto lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2 h-[350px] lg:h-[280px] backdrop-blur-xl rounded-2xl">
        <TestimonalsCarousel
          title="Lo que dicen nuestro clientes"
          testimonials={testimonials}
        />
      </div>
    </section>
  );
};
