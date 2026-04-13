import { Suspense } from "react";
import type { Metadata } from "next";

import { OurTeam } from "../_components/OurTeam/OurTeam";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rykabogados.cl"),
  title: "Asesoría Legal para Empresas | Reserva una Consulta | RK Abogados",
  description:
    "¿Tu empresa necesita asesoría legal? Habla con nuestros abogados especialistas en derecho empresarial y laboral. Soluciones a medida para tu negocio en todo Chile.",
  keywords: [
    "abogado empresas chile",
    "asesoría legal empresas",
    "consulta abogado empresa",
    "abogado laboral empresas santiago",
    "abogado derecho empresarial",
    "asesoría jurídica empresa chile",
    "abogado contratos empresa",
    "abogado recursos humanos",
  ],
  openGraph: {
    title: "Asesoría Legal para Empresas | RK Abogados",
    description:
      "Habla con nuestros abogados especialistas en derecho empresarial y laboral. Soluciones jurídicas a medida para empresas en todo Chile.",
    url: "https://www.rykabogados.cl/habla-con-nosotros/empresas",
    siteName: "RK Abogados",
    images: [
      {
        url: "/images/heros/cami_paolo.webp",
        width: 1200,
        height: 630,
        alt: "Abogados de RK Abogados asesorando a empresa",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asesoría Legal para Empresas | RK Abogados",
    description:
      "Habla con nuestros abogados especialistas en derecho empresarial y laboral. Soluciones jurídicas a medida para empresas en todo Chile.",
    images: ["/images/heros/cami_paolo.webp"],
  },
  alternates: {
    canonical: "https://www.rykabogados.cl/habla-con-nosotros/empresas",
  },
};

import { Casos } from "./_components/Casos/Casos";
import { ClientsReel } from "./_components/ClientsReel/ClientsReel";
import { Contact } from "./_components/Contact/Contact";
import { Hero } from "./_components/Hero/Hero";
import { HeroVideo } from "./_components/HeroVideo/HeroVideo";
import { Pricing } from "./_components/Pricing/Pricing";
import { ReservaFormEmpresas } from "./_components/ReservaFormEmpresas/ReservaFormEmpresas";
import { Services } from "./_components/Services/Services";
import { Slogan } from "./_components/Slogan/Slogan";
import { Videos } from "./_components/Videos/Videos";

export default function HablaConNosotrosEmpresas() {
  return (
    <>
      <div>
        <Hero />

        <Services />

        <Suspense>
          <ReservaFormEmpresas />
        </Suspense>

        <Pricing />

        <Slogan />

        <OurTeam />

        <Videos />

        <HeroVideo videoId="CeJ8x0hRmoM" />

        <Casos />

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
