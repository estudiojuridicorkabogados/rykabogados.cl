import Image from "next/image";

import { ContactButton } from "./ContactButton";

export const ContactSection = () => {
  return (
    <section className="relative h-[540px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/heros/santiago.webp"
          alt="los fundadores de RK abogados"
          fill
          className="object-cover object-center"
          sizes="100vw"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 bg-black/57 lg:bg-black/37" />

      <div className="relative z-10 container mx-auto lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl px-6 flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 flex">
          <h3 className="text-3xl lg:text-5xl text-gray-60">
            Agenda una llamada
          </h3>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-2 lg:gap-4">
          <span className="uppercase text-sm text-accent font-bold tracking-[2px]">
            ¿Tienes Preguntas?
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-60">
            Contáctanos
          </h2>

          <p className="text-gray-60 mb-6">
            Cuéntanos tu caso, nosotros nos encargamos del resto. Nuestro equipo
            de abogados especializados está listo para brindarte la asesoría
            legal que necesitas.
          </p>

          <ContactButton />
        </div>
      </div>
    </section>
  );
};
