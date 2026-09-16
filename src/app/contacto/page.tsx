import { Suspense } from "react";

import { buildPageMetadata } from "@/lib/seo/site";

import { ContactForm } from "./_components/ContactForm/ContactForm";
import { Contacts } from "./_components/Contacts/Contacts";

export const metadata = buildPageMetadata({
  title: "Contacto | RK Abogados — Providencia, Santiago",
  description:
    "Contacta a RK Abogados: Padre Mariano 82, oficina 704, Providencia. Llámanos al +56 2 3380 8828, escríbenos a contacto@rkabogados.cl o completa el formulario y te respondemos en 24 horas hábiles.",
  path: "/contacto",
  keywords: [
    "contacto abogado laboral",
    "abogados providencia",
    "teléfono rk abogados",
    "estudio jurídico santiago contacto",
  ],
});

export default function Contacto() {
  return (
    <>
      <div className="w-full bg-[#252525] px-6 py-16 lg:min-h-[calc(100dvh-100px)] lg:px-0 lg:py-24">
        <div className="flex h-full flex-col gap-16 lg:mx-auto lg:max-w-6xl lg:min-w-6xl lg:flex-row lg:items-start lg:justify-center lg:gap-36 2xl:w-7xl 2xl:max-w-7xl">
          <Suspense>
            <ContactForm />
          </Suspense>

          <Contacts />
        </div>
      </div>

      <style>
        {`     
          .grecaptcha-badge {
            visibility: visible;
            bottom: 90px !important;
            z-index: 40;
          }`}
      </style>
    </>
  );
}
