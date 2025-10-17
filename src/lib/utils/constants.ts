import { Route } from "next";

interface UrlsMap {
  [slug: string]: (...args: any[]) => Route;
}

export const URLS: UrlsMap = {
  // Internal links
  home: () => "/",
  asesoriaEmpresas: () => "/asesoria-empresas",
  asesoriaTrabajadores: () => "/asesoria-trabajadores",
  otrasAreas: () => "/otras-areas",
  nosotros: () => "/nosotros",
  contacts: () => "/contacto",
  speakWithUs: () => "/habla-con-nosotros",
  blog: () => "/blog",
  blogPost: (slug: string) => `/blog/${slug}` as unknown as Route,
  avisoLegal: () => "/aviso-legal",
  faq: () => "/faqs",
  cookiePolicy: () => "/politica-cookies",
  // External links
  facebook: () =>
    "https://www.facebook.com/p/RO-Abogados-Chile-100066607063186",
  instagram: () => "https://www.instagram.com/ryoabogadoschile",
  linkedin: () => "https://linkedin.com",
  whatsapp: () =>
    "http://api.whatsapp.com/send/?phone=56986395780&text=%C2%A1Hola%21+Me+gustar%C3%ADa+una+asesor%C3%ADa+laboral+gratuita&type=phone_number&app_absent=0",
};

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  phone: string;
  phoneLink: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Camila Retamales Quiroz",
    role: "Abogada Fundadora",
    photo: "/images/team/camila.webp",
    linkedin: "https://www.linkedin.com/in/camila-retamales-082a63160",
    phone: "+56 9 8639 5780",
    phoneLink: "tel:+56986395780",
  },
  {
    name: "Sebastian Kowalski",
    role: "Chief Executive Officer",
    photo: "/images/team/sebastian.webp",
    linkedin: "https://www.linkedin.com/in/sebastian-kowalski-605706197",
    phone: "+56 9 5185 6194",
    phoneLink: "tel:+56951856194",
  },
  {
    name: "Luciano Ascui Mestre",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/luciano-old.webp",
    linkedin: "https://www.linkedin.com/in/luciano-ignacio-ascui-67784a12a",
    phone: "+56 9 7873 4201",
    phoneLink: "tel:+56978734201",
  },
  {
    name: "Nicole Ulloa Evert",
    role: "Abogada Derecho Laboral",
    photo: "/images/team/nicole-old.webp",
    linkedin: "https://www.linkedin.com/in/nicoleulloaevert",
    phone: "+56 9 7394 0304",
    phoneLink: "tel:+56973940304",
  },
  {
    name: "Bastián Morales Romero",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/bastian-old.webp",
    linkedin: "https://www.linkedin.com/in/moralesromero",
    phone: "+56 9 7881 4048",
    phoneLink: "tel:+56978814048",
  },
  {
    name: "Paolo Castiglione Cañas",
    role: "Abogado Derecho Laboral",
    photo: "/images/team/paolo.webp",
    linkedin: "https://www.linkedin.com/in/paolo-castiglione-ca%C3%B1as-90805422",
    phone: "+56 9 7895 1026",
    phoneLink: "tel:+56978951026",
  },
  {
    name: "Constanza Zarricueta",
    role: "Abogada Derecho Laboral",
    photo: "/images/team/constanza.webp",
    linkedin: "https://www.linkedin.com/in/constanza-zarricueta-cruz-776b4a215",
    phone: "+56 9 8257 2369",
    phoneLink: "tel:+56982572369",
  },
];
