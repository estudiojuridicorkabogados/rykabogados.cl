export type IconType = "contact" | "analysis" | "case-file" | "success";

export interface IStep {
  stepNumber: string;
  title: string;
  description: string;
  icon: IconType;
}

export const STEPS: IStep[] = [
  {
    stepNumber: "01",
    title: "Asesoría inicial sin costo (30 minutos)",
    description:
      "Agenda una reunión con un abogado de nuestro equipo para exponer tu situación. Analizamos el contexto general y te entregamos una primera orientación sobre riesgos, alternativas y posibles cursos de acción.",
    icon: "contact",
  },
  {
    stepNumber: "02",
    title: "Diagnóstico y propuesta de servicios",
    description:
      "Revisamos los antecedentes relevantes —contratos, documentación laboral, escenario operativo— y elaboramos un diagnóstico jurídico. Sobre esa base, enviamos una propuesta de servicios clara, con alcance, estrategia recomendada, plazos y honorarios.",
    icon: "analysis",
  },
  {
    stepNumber: "03",
    title: "Implementación",
    description:
      "Ejecutamos la estrategia acordada, acompañando a la empresa en la gestión e implementación de las decisiones adoptadas, resguardando la continuidad operativa y manteniendo bajo control las contingencias laborales o legales.",
    icon: "case-file",
  },
];
