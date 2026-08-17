import { Accordion } from "@/components/Accordion/Accordion";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { buildFaqJsonLd } from "@/lib/seo/jsonLd";
import { buildPageMetadata } from "@/lib/seo/site";

import { FAQS } from "./_components/constant";
import { FaqsContacts } from "./_components/FaqsContacts";

export const metadata = buildPageMetadata({
  title: "Preguntas Frecuentes | RK Abogados",
  description:
    "Respuestas a las consultas más comunes sobre nuestros servicios legales: costo de la primera consulta, documentos necesarios, plazos, formas de pago y cobertura en todo Chile.",
  path: "/faqs",
  keywords: [
    "preguntas frecuentes abogados",
    "cuánto cuesta un abogado laboral chile",
    "consulta gratuita abogado laboral",
  ],
});

const faqEntries = FAQS.filter(
  (faq) => faq.plainAnswer || typeof faq.description === "string"
).map((faq) => ({
  question: faq.title,
  answer: faq.plainAnswer ?? (faq.description as string),
}));

export default function FaqsPage() {
  return (
    <div className="w-full bg-white py-8 lg:py-16">
      <div className="mx-auto px-6 lg:max-w-6xl lg:min-w-6xl 2xl:w-7xl 2xl:max-w-7xl">
        <div className="lg:max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold text-[#252525] lg:mb-8 lg:text-5xl">
            Preguntas Frecuentes
          </h1>

          <p className="mb-12 text-base text-gray-700 lg:text-lg">
            Aquí encontrarás respuestas a las preguntas más comunes sobre
            nuestros servicios legales. Si no encuentras la información que
            buscas, no dudes en contactarnos o utilizar el chatbot en la parte
            inferior de la página.
          </p>
        </div>
      </div>

      <Accordion entries={FAQS} />

      <FaqsContacts />

      <JsonLd schema={buildFaqJsonLd(faqEntries)} />
    </div>
  );
}
