export type IconType = "calendar" | "document" | "chatBubble" | "handshake";

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
    icon: "document",
  },
  {
    stepNumber: "03",
    title: "Consulta legal",
    description:
      "Recibe asesoramiento experto sobre tus derechos y opciones legales.",
    icon: "chatBubble",
  },
  {
    stepNumber: "04",
    title: "Resolución del caso",
    description: "Trabajamos contigo para alcanzar la mejor solución posible.",
    icon: "handshake",
  },
];
