export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export const VIDEOS: Video[] = [
  {
    id: "1",
    title: "En RK Abogados defendemos a empresas frente a demandas laborales",
    description:
      "Evaluamos estrategia, riesgos y alternativas, acompañándote durante todo el proceso judicial.",
    videoUrl: "https://www.youtube.com/watch?v=oHp5iE3WUmk",
  },
  {
    id: "2",
    title:
      "Actualizamos el Reglamento Interno de Orden, Higiene y Seguridad de tu empresa",
    description:
      "Revisamos, redactamos y actualizamos el reglamento interno conforme a la normativa vigente, para fortalecer el cumplimiento laboral y prevenir contingencias.",
    videoUrl: "https://www.youtube.com/shorts/smzCvgJqE3A",
  },
  {
    id: "3",
    title:
      "En RK Abogados acompañamos a empresas en procedimientos de desvinculación:",
    description:
      "Brindamos apoyo en la evaluación, preparación y ejecución de desvinculaciones, resguardando el cumplimiento normativo y reduciendo contingencias para la empresa.",
    videoUrl: "https://www.youtube.com/shorts/7tAqYRJO3Cs",
  },
];
