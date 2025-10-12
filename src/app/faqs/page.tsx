import type { Metadata } from "next";

import { Accordion } from "@/components/Accordion/Accordion";

import { FAQS } from "./_components/constant";
import { FaqsContacts } from "./_components/FaqsContacts";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | RK Abogados",
  description:
    "Preguntas frecuentes de RK Abogados. Encuentra respuestas a las consultas más comunes sobre nuestros servicios legales.",
};

export default function FaqsPage() {
  return (
    <div className="bg-white w-full py-8 lg:py-16">
      <div className="px-6 lg:min-w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl mx-auto">
        <div className="lg:max-w-4xl">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#252525] mb-4 lg:mb-8">
            Preguntas Frecuentes
          </h1>

          <p className="text-base lg:text-lg text-gray-700 mb-12">
            Aquí encontrarás respuestas a las preguntas más comunes sobre
            nuestros servicios legales. Si no encuentras la información que
            buscas, no dudes en contactarnos o utilizar el chatbot en la parte
            inferior de la página.
          </p>
        </div>
      </div>

      <Accordion entries={FAQS} />

      <FaqsContacts />
    </div>
  );
}
