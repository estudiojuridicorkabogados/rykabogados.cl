import type {
  BreadcrumbList,
  FAQPage,
  LegalService,
  WebSite,
  WithContext,
} from "schema-dts";

import { ADDRESS, CONTACTO_EMAIL, URLS } from "@/lib/utils/constants";

import { absoluteUrl, SITE_LEGAL_NAME, SITE_NAME, SITE_URL } from "./site";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function buildOrganizationJsonLd(): WithContext<LegalService> {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    description:
      "Estudio jurídico chileno especializado en derecho laboral, con asesoría y representación para trabajadores y empresas en todo Chile.",
    url: SITE_URL,
    logo: absoluteUrl("/images/logos/logo-black.png"),
    image: absoluteUrl("/images/rk_abogados_office.webp"),
    email: CONTACTO_EMAIL,
    telephone: "+56233808828",
    vatID: "77.703.086-8",
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS,
      addressLocality: "Providencia",
      addressRegion: "Región Metropolitana",
      addressCountry: "CL",
    },
    areaServed: {
      "@type": "Country",
      name: "Chile",
    },
    priceRange: "$$",
    knowsLanguage: ["es-CL", "en", "it"],
    sameAs: [URLS.instagram(), URLS.facebook(), URLS.linkedin()],
  };
}

export function buildWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "es-CL",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function buildFaqJsonLd(
  entries: Array<{ question: string; answer: string }>
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(URLS.faq())}/#faqpage`,
    inLanguage: "es-CL",
    mainEntity: entries.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(({ name, path }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  };
}

export { ORGANIZATION_ID };
