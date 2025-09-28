export type IconType = "calendar" | "webinar" | "piggy" | "hands";

export interface IStep {
  stepNumber: string;
  title: string;
  description: string;
  icon: IconType;
}

export const STEPS: IStep[] = [
  {
    stepNumber: "01",
    title: "Reserva una consulta",
    description:
      "Agenda una reunión inicial para discutir tu situación y objetivos legales.",
    icon: "calendar",
  },
  {
    stepNumber: "02",
    title: "Revisión de documentos",
    description:
      "Proporciona todos los documentos relevantes para que podamos analizarlos.",
    icon: "webinar",
  },
  {
    stepNumber: "03",
    title: "Consulta legal",
    description:
      "Recibe asesoramiento experto sobre tus derechos y opciones legales.",
    icon: "piggy",
  },
  {
    stepNumber: "04",
    title: "Resolución del caso",
    description: "Trabajamos contigo para alcanzar la mejor solución posible.",
    icon: "hands",
  },
];
