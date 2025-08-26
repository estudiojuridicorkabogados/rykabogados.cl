import { Route } from "next";

interface UrlsMap {
  [slug: string]: (...args: any[]) => Route;
}

export const URLS: UrlsMap = {
  home: () => "/",
  asesoriaEmpresas: () => "/asesoria-empresas",
  asesoriaTrabajadores: () => "/asesoria-trabajadores",
  nosotros: () => "/nosotros",
  contacts: () => "/contacto",
  speakWithUs: () => "/habla-con-nosotros",
  blog: () => "/blog",
  blogPost: (slug: string) => `/blog/${slug}` as unknown as Route,
  facebook: () => "https://www.facebook.com/p/RO-Abogados-Chile-100066607063186",
  instagram: () => "https://www.instagram.com/ryoabogadoschile",
  linkedin: () => "https://linkedin.com",
};

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  linkedin?: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Camila Retamales",
    role: "Abogada Fundadora",
    photo: "/images/team/camila.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Luciano Ascui",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/luciano.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Javiera Fredes",
    role: "Abogada Derecho Laboral",
    photo: "/images/team/javiera.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Bastian Morales",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/bastian.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Luciano Ascui",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/luciano.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Javiera Fredes",
    role: "Abogada Derecho Laboral",
    photo: "/images/team/javiera.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Camila Retamales",
    role: "Abogada Fundadora",
    photo: "/images/team/camila.jpg",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Bastian Morales",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/bastian.jpg",
    linkedin: "https://www.linkedin.com/",
  },
];