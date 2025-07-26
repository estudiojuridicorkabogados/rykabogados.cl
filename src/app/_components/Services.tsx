import { FileText, Gavel, Shield, Users } from "lucide-react";

export const ServicesSection = () => {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-[#AE8D54] font-semibold tracking-widest text-sm mb-4">
            NUESTRAS FORTALEZAS
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B142D] mb-8">
            ¿Por qué RyK Abogados?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: "Experiencia Comprobada",
              description:
                "Más de 15 años resolviendo casos complejos con resultados exitosos.",
            },
            {
              icon: FileText,
              title: "Asesoría Personalizada",
              description:
                "Soluciones jurídicas adaptadas a cada necesidad específica.",
            },
            {
              icon: Gavel,
              title: "Litigación Efectiva",
              description:
                "Representación legal sólida con estrategias probadas.",
            },
            {
              icon: Users,
              title: "Atención Integral",
              description:
                "Disponibles cuando nos necesites. Tu tranquilidad es prioridad.",
            },
          ].map((service, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-50 p-8 mb-6 group-hover:bg-[#AE8D54] transition-colors duration-300">
                <service.icon className="h-12 w-12 text-[#AE8D54] group-hover:text-white mx-auto transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-[#0B142D] mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
