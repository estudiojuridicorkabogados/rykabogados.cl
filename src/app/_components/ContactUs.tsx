import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/Button";

export const ContactUsSection = () => {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#AE8D54] font-semibold tracking-widest text-sm mb-4">
            CONTACTO
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B142D] mb-8">
            ¿Necesitas asesoría legal profesional?
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Tu primera consulta es completamente gratuita. Contáctanos hoy
            mismo.
          </p>

          <div className="grid md:grid-cols-2 gap-16 mt-16">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-[#0B142D] mb-8">
                Información de Contacto
              </h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-[#AE8D54] mr-4" />
                  <div>
                    <div className="font-semibold text-[#0B142D]">Teléfono</div>
                    <div className="text-gray-600">+56 2 2345 6789</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-[#AE8D54] mr-4" />
                  <div>
                    <div className="font-semibold text-[#0B142D]">Email</div>
                    <div className="text-gray-600">
                      contacto@ryoasociados.cl
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-[#AE8D54] mr-4" />
                  <div>
                    <div className="font-semibold text-[#0B142D]">
                      Dirección
                    </div>
                    <div className="text-gray-600">
                      Av. Providencia 1234, Providencia, Santiago
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left">
              <h3 className="text-2xl font-bold text-[#0B142D] mb-8">
                Envíanos un Mensaje
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* <Input placeholder="Nombre completo" className="border-gray-300" />
                    <Input type="email" placeholder="Email" className="border-gray-300" /> */}
                </div>
                {/* <Input placeholder="Teléfono" className="border-gray-300" />
                  <Textarea placeholder="Describe tu caso brevemente..." rows={4} className="border-gray-300" /> */}
                <Button className="w-full bg-[#AE8D54] hover:bg-[#AE8D54]/90 text-white py-3 font-semibold">
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
