import type { Metadata } from "next";

import { env } from "@/lib/env";

/**
 * Canonical origin for the site. Every absolute URL we emit (canonicals,
 * og:url, sitemap, JSON-LD ids) must be built from this so the whole site
 * points at one hostname.
 */
export const SITE_URL = env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");

export const SITE_NAME = "RK Abogados";
export const SITE_LEGAL_NAME = "Retamales Kowalski Abogados Limitada";
export const SITE_LOCALE = "es_CL";

export const DEFAULT_DESCRIPTION =
  "Estudio jurídico chileno especializado en derecho laboral. Asesoramos y representamos a trabajadores y empresas en todo Chile: despidos, finiquitos, acoso laboral y cumplimiento normativo.";

export const DEFAULT_OG_IMAGE = {
  url: "/images/heros/cami_paolo.webp",
  width: 1200,
  height: 630,
  alt: "Equipo de abogados de RK Abogados",
};

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

interface PageMetadataParams {
  title: string;
  description: string;
  /** Route path, always starting with "/" — used for canonical and og:url. */
  path: string;
  keywords?: string[];
  image?: { url: string; width: number; height: number; alt: string };
}

/**
 * Builds page metadata with a self-referencing canonical plus matching Open
 * Graph / Twitter tags, so every page declares one unambiguous URL.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image = DEFAULT_OG_IMAGE,
}: PageMetadataParams): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
