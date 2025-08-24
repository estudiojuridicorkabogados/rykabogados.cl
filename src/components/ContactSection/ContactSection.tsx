import Image from "next/image";

import { ContactButton } from "./ContactButton";

export const ContactSection = () => {
  return (
    <section className="relative h-[540px] flex items-center justify-center overflow-hidden">
      <Image
        src="/images/contactanos.webp"
        alt="Una senora que trabaja al compuderador"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/37" />

      <div className="relative z-10 container mx-auto max-w-6xl px-6 flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 flex">
          <h3 className="text-3xl lg:text-5xl text-gray-60">
            Agenda una llamada de evaluación gratis
          </h3>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <span className="uppercase text-sm text-accent font-bold tracking-[3px]">
            Tienes Preguntas?
          </span>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-60">Contáctanos</h2>

          <p className="text-gray-60 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            vitae a delectus voluptatem sapiente, dolore quo quidem deleniti
            fugiat, ipsam aliquid
          </p>

          <ContactButton />
        </div>
      </div>
    </section>
  );
};
