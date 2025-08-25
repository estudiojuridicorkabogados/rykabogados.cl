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
  facebook: () => "https://www.facebook.com/p/RO-Abogados-Chile-100066607063186",
  instagram: () => "https://www.instagram.com/ryoabogadoschile",
  linkedin: () => "https://linkedin.com",
};
