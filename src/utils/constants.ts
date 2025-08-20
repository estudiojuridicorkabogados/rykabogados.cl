import { Route } from "next";

interface UrlsMap {
  [slug: string]: (...args: any[]) => Route;
}

export const URLS: UrlsMap = {
  home: () => "/",
  asesoriaEmpresas: () => "/asesoria-empresas",
  asesoriaTrabajadores: () => "/asesoria-trabajadores",
  contacts: () => "/contacto",
  speakWithUs: () => "/habla-con-nosotros",
  blog: () => "/blog",
  blogPost: (slug: string) => `/blog/${slug}` as unknown as Route,
  facebook: () => "https://facebook.com",
  instagram: () => "https://instagram.com",
  linkedin: () => "https://linkedin.com",
};
