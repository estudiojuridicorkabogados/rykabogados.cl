import { Route } from "next";

interface UrlsMap {
  [slug: string]: (...args: any[]) => Route;
}

export const URLS: UrlsMap = {
  home: () => "/",
  asesoriaEmpresas: () => "/asesoria-empresas",
  asesoriaTrabajadores: () => "/asesoria-trabajadores",
  avisoLegal: () => "/aviso-legal",
  faq: () => "/faqs",
  otrasAreas: () => "/otras-areas",
  nosotros: () => "/nosotros",
  contacts: () => "/contacto",
  speakWithUs: () => "/habla-con-nosotros",
  blog: () => "/blog",
  blogPost: (slug: string) => `/blog/${slug}` as unknown as Route,
  facebook: () => "https://www.facebook.com/p/RO-Abogados-Chile-100066607063186",
  instagram: () => "https://www.instagram.com/ryoabogadoschile",
  linkedin: () => "https://linkedin.com",
  whatsapp: () => "http://api.whatsapp.com/send/?phone=56986395780&text=%C2%A1Hola%21+Me+gustar%C3%ADa+una+asesor%C3%ADa+laboral+gratuita&type=phone_number&app_absent=0",
};

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  linkedin?: string;
  imageAlignment?: "top" | "bottom";
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Camila Retamales",
    role: "Abogada Fundadora",
    photo: "/images/team/camila.webp",
    linkedin: "https://www.linkedin.com/",
  },
    {
    name: "Sebastian Kowalski",
    role: "Chief Executive Officer",
    photo: "/images/team/sebastian.webp",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Luciano Ascui",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/luciano.webp",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Nicole Ulloa",
    role: "Abogada Derecho Laboral",
    photo: "/images/team/nicole.webp",
    linkedin: "https://www.linkedin.com/",
    imageAlignment: "top",
  },
  {
    name: "Bastian Morales",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/bastian.webp",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Paolo Castiglione",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/paolo.webp",
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "Constanza Zarricueta",
    role: "Abogada Derecho Laboral",
    photo: "/images/team/constanza.webp",
    linkedin: "https://www.linkedin.com/",
  },
];