import { Route } from "next";

interface UrlsMap {
  [slug: string]: (...args: string[]) => Route;
}

export const URLS: UrlsMap = {
  // Internal links
  home: () => "/",
  asesoriaEmpresas: () => "/asesoria-empresas",
  asesoriaTrabajadores: () => "/asesoria-trabajadores",
  otrasAreas: () => "/otras-areas",
  nosotros: () => "/nosotros",
  contacts: () => "/contacto",
  speakWithUsTrabajadores: () => "/habla-con-nosotros/trabajadores",
  speakWithUsEmpresas: () => "/habla-con-nosotros/empresas",
  blog: () => "/blog",
  blogPost: (slug: string) => `/blog/${slug}` as unknown as Route,
  privacyPolicy: () => "/politicas-de-privacidad",
  faq: () => "/faqs",
  cookiePolicy: () => "/politica-cookies",
  // External links
  facebook: () =>
    "https://www.facebook.com/p/RO-Abogados-Chile-100066607063186",
  instagram: () => "https://www.instagram.com/rkabogados/",
  linkedin: () =>
    "https://www.linkedin.com/company/retamales-kowalski-abogados/",
};

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  phone: string;
  phoneLink: string;
  email: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Camila Retamales Quiroz",
    role: "Abogada Socia",
    photo: "/images/team/camila.webp",
    linkedin: "https://www.linkedin.com/in/camila-retamales-082a63160",
    phone: "+56 9 8639 5780",
    phoneLink: "tel:+56986395780",
    email: "camila.retamales@rkabogados.cl",
  },
  {
    name: "Sebastian Kowalski",
    role: "Chief Executive Officer",
    photo: "/images/team/sebastian.webp",
    linkedin: "https://www.linkedin.com/in/sebastian-kowalski-605706197",
    phone: "+56 9 5185 6194",
    phoneLink: "tel:+56951856194",
    email: "sebastian.kowalski@rkabogados.cl",
  },
  {
    name: "Luciano Ascui Mestre",
    role: "Abogado",
    photo: "/images/team/luciano.webp",
    linkedin: "https://www.linkedin.com/in/luciano-ignacio-ascui-67784a12a",
    phone: "+56 9 7873 4201",
    phoneLink: "tel:+56978734201",
    email: "luciano.ascui@rkabogados.cl",
  },
  {
    name: "Nicole Ulloa Evert",
    role: "Abogada",
    photo: "/images/team/nicole.webp",
    linkedin: "https://www.linkedin.com/in/nicoleulloaevert",
    phone: "+56 9 7394 0304",
    phoneLink: "tel:+56973940304",
    email: "nicole.ulloa@rkabogados.cl",
  },
  {
    name: "Bastián Morales Romero",
    role: "Abogado",
    photo: "/images/team/bastian.webp",
    linkedin: "https://www.linkedin.com/in/moralesromero",
    phone: "+56 9 7881 4048",
    phoneLink: "tel:+56978814048",
    email: "bastian.morales@rkabogados.cl",
  },
  {
    name: "Paolo Castiglione Cañas",
    role: "Abogado",
    photo: "/images/team/paolo.webp",
    linkedin:
      "https://www.linkedin.com/in/paolo-castiglione-ca%C3%B1as-908054221",
    phone: "+56 9 7895 1026",
    phoneLink: "tel:+56978951026",
    email: "paolo.castiglione@rkabogados.cl",
  },
  {
    name: "Odette Silva Álvarez",
    role: "Abogada",
    photo: "/images/team/odette.webp",
    linkedin: "https://www.linkedin.com/in/odette-silva-%C3%A1lvarez-2448091ba",
    phone: "+56 9 7385 3615",
    phoneLink: "tel:+56973853615",
    email: "odette.silva@rkabogados.cl",
  },
  {
    name: "Kiara Jiménez Soto",
    role: "Procuradora",
    photo: "/images/team/kiara_jimenez.webp",
    linkedin: "https://www.linkedin.com",
    phone: "+56 9 8257 2369",
    phoneLink: "tel:+56982572369",
    email: "kiara.jimenez@rkabogados.cl",
  },
  {
    name: "Camila Gallardo Olivera",
    role: "Abogada",
    photo: "/images/team/camila_gallardo.webp",
    linkedin: "https://www.linkedin.com",
    phone: "+56 9 8822 1763",
    phoneLink: "tel:+56988221763",
    email: "camila.gallardo@rkabogados.cl",
  },
  {
    name: "Sandra Riquelme Reyes",
    role: "Of Counsel",
    photo: "/images/team/sandra.webp",
    linkedin: "https://www.linkedin.com/in/sandra-riquelme-3b259188",
    phone: "223644258",
    phoneLink: "tel:+56223644258",
    email: "contacto@rkabogados.cl",
  },
  {
    name: "Nicolás Moreno Marchant",
    role: "Of Counsel",
    photo: "/images/team/nico.webp",
    linkedin: "https://www.linkedin.com/in/nicol%C3%A1s-m-18144385",
    phone: "223644258",
    phoneLink: "tel:+56223644258",
    email: "contacto@rkabogados.cl",
  },
  {
    name: "Noemi Ricci",
    role: "Traducción y gestión internacional",
    photo: "/images/team/noemi_ricci.jpeg",
    linkedin: "https://www.linkedin.com",
    phone: "223644258",
    phoneLink: "tel:+56223644258",
    email: "contacto@rkabogados.cl",
  },
  {
    name: "Gabriele Para",
    role: "Traducción y marketing",
    photo: "/images/team/gabriele_para.jpeg",
    linkedin: "https://www.linkedin.com",
    phone: "223644258",
    phoneLink: "tel:+56223644258",
    email: "contacto@rkabogados.cl",
  },
];

export const CONTACTO_EMAIL = "contacto@rkabogados.cl";
export const CAMILA_EMAIL = "camila.retamales@rkabogados.cl";

export const ADDRESS = "Padre Mariano 82, oficina 704, Providencia";
