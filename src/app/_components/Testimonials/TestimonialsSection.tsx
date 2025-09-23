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
      className="relative w-screen h-[590px] lg:h-[690px] bg-[#0B142D] text-white overflow-hidden"
    >
      <Image
        src="/images/santiago.webp"
        alt="Santiago del Chile"
        fill
        sizes="100vw"
        className="object-cover object-top"
      />

      <div className="absolute h-[480px] lg:h-[450px] bottom-0 left-0 right-0 backdrop-blur-[3px] flex items-center">
        <TestimonalsCarousel
          title="Lo que dicen nuestro clientes"
          testimonials={testimonials}
        />
      </div>
    </section>
  );
};
