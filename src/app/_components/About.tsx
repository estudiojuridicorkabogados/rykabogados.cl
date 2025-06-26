import Image from "next/image";

export const AboutSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-8">
              <div className="text-[#AE8D54] font-semibold tracking-widest text-sm mb-4">
                NUESTRO COMPROMISO
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0B142D] leading-tight">
                Excelencia jurídica al servicio de la justicia
              </h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              En RYO Asociados, combinamos la tradición jurídica con la
              innovación legal para ofrecer soluciones integrales a nuestros
              clientes. Nuestro compromiso con la excelencia nos ha posicionado
              como uno de los estudios más respetados de Chile.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-bold text-[#AE8D54] mb-2">
                  500+
                </div>
                <div className="text-gray-600">Casos Exitosos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#AE8D54] mb-2">
                  15+
                </div>
                <div className="text-gray-600">Años de Experiencia</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gray-100 rounded-lg p-8">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Equipo RYO Asociados"
                width={600}
                height={500}
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
