import { Star } from "lucide-react";

export const TestimonialsSection = () => {
  return (
    <section id="testimonios" className="py-24 bg-[#0B142D] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-[#AE8D54] font-semibold tracking-widest text-sm mb-4">
            TESTIMONIOS
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            {
              quote:
                "Excelente atención y profesionalismo. Me ayudaron a resolver mi caso de despido injustificado de manera efectiva.",
              name: "María Carmen Rodríguez",
              role: "Trabajadora",
            },
            {
              quote:
                "Como empresa, necesitábamos asesoría legal confiable. RYO Asociados nos ha acompañado en nuestro crecimiento.",
              name: "Jorge Silva",
              role: "CEO, TechStart",
            },
            {
              quote:
                "Profesionales de primer nivel. Lograron un resultado mejor del que esperaba en mi caso complejo.",
              name: "Ana Patricia Morales",
              role: "Empresaria",
            },
          ].map((testimonial, index) => (
            <div key={index} className="text-center">
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-[#AE8D54] fill-current inline-block mr-1"
                  />
                ))}
              </div>
              <blockquote className="text-lg italic mb-8 leading-relaxed">
                {'"'}
                {testimonial.quote}
                {'"'}
              </blockquote>
              <div>
                <div className="font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-gray-400">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
