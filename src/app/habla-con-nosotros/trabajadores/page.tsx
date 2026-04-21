import type { Metadata } from "next";

import { OurTeam } from "../_components/OurTeam/OurTeam";

import { Areas } from "./_components/Areas/Areas";
import { ClientsReel } from "./_components/ClientsReel/ClientsReel";
import { Contact } from "./_components/Contact/Contact";
import { Hero } from "./_components/Hero/Hero";
import { NextStepsTrabajadores } from "./_components/NextStepsTrabajadores/NextStepsTrabajadores";
import { Press } from "./_components/Press/Press";
import { ReservaFormTrabajadores } from "./_components/ReservaFormTrabajadores/ReservaFormTrabajadores";
import { Slogan } from "./_components/Slogan/Slogan";
import { Videos } from "./_components/Videos/Videos";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rykabogados.cl"),
  title: "Habla con un Abogado Laboral | Reserva tu Consulta | RK Abogados",
  description:
    "¿Tienes un problema laboral? Reserva una consulta con nuestros abogados especialistas en derecho del trabajo. Atendemos trabajadores en todo Chile. Agenda tu hora hoy.",
  keywords: [
    "consulta abogado laboral",
    "abogado trabajadores chile",
    "reservar consulta abogado",
    "abogado laboral santiago",
    "asesoría legal trabajadores",
    "hablar con abogado",
    "derechos laborales chile",
    "abogado despido injustificado",
  ],
  openGraph: {
    title: "Habla con un Abogado Laboral | RK Abogados",
    description:
      "Reserva una consulta con nuestros abogados especialistas en derecho laboral. Defendemos tus derechos como trabajador en todo Chile.",
    url: "https://www.rykabogados.cl/habla-con-nosotros/trabajadores",
    siteName: "RK Abogados",
    images: [
      {
        url: "/images/heros/cami_paolo.webp",
        width: 1200,
        height: 630,
        alt: "Abogados laborales de RK Abogados asesorando a un trabajador",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Habla con un Abogado Laboral | RK Abogados",
    description:
      "Reserva una consulta con nuestros abogados especialistas en derecho laboral. Defendemos tus derechos como trabajador en todo Chile.",
    images: ["/images/heros/cami_paolo.webp"],
  },
  alternates: {
    canonical: "https://www.rykabogados.cl/habla-con-nosotros/trabajadores",
  },
};

export default function HablaConNosotrosTrabajadores() {
  return (
    <>
      <div>
        <Hero />

        <ReservaFormTrabajadores />

        <Areas />

        <NextStepsTrabajadores />

        <Slogan />

        <OurTeam />

        <Videos />

        <Press />

        <Contact />

        <ClientsReel />
      </div>

      <style>
        {`     
          .grecaptcha-badge {
            visibility: visible;
            bottom: 90px !important;
            z-index: 100;
          }`}
      </style>
    </>
  );
}
