import { ArrowRight,Building2, Users } from "lucide-react";
import Link from "next/link";

export const PracticeAreasSection = () => {
  return (
    <section id="areas" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="text-[#AE8D54] font-semibold tracking-widest text-sm mb-4">
            NUESTRAS ESPECIALIDADES
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B142D] mb-8">
            Áreas de Práctica
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ofrecemos servicios jurídicos especializados con un enfoque integral
            y personalizado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Para Trabajadores */}
          <div className="group">
            <div className="bg-white p-12 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="bg-[#AE8D54] p-3 rounded-sm mr-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0B142D] mb-2">
                    Para Trabajadores
                  </h3>
                  <div className="w-12 h-0.5 bg-[#AE8D54]"></div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                Defendemos los derechos laborales con dedicación y experiencia.
                Nos especializamos en despidos injustificados, acoso laboral,
                accidentes del trabajo, cobro de prestaciones y protección del
                fuero maternal y sindical.
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-[#AE8D54] font-semibold hover:text-[#0B142D] transition-colors"
              >
                Consultar Caso
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Para Empresas */}
          <div className="group">
            <div className="bg-white p-12 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-8">
                <div className="bg-[#0B142D] p-3 rounded-sm mr-6">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0B142D] mb-2">
                    Para Empresas
                  </h3>
                  <div className="w-12 h-0.5 bg-[#AE8D54]"></div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                Asesoría integral empresarial para el crecimiento seguro de su
                negocio. Especialistas en constitución de sociedades, contratos
                laborales, compliance, fusiones, adquisiciones y propiedad
                intelectual.
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-[#AE8D54] font-semibold hover:text-[#0B142D] transition-colors"
              >
                Asesoría Empresarial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
