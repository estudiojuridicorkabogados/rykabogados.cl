import Image from "next/image";

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
      className="relative w-screen h-[650px] bg-[#0B142D] text-white overflow-hidden"
    >
      <Image
        src="/images/santiago-mountains.jpg"
        alt="Santiago del Childe"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 backdrop-blur-[3px] flex items-center">
        <TestimonalsCarousel
          title="Lo que dicen nuestro clientes"
          testimonials={testimonials}
        />
      </div>
    </section>
  );
};
