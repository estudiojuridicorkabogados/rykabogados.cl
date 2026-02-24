import { IStep } from "@/components/HablaConNosotrosStep/types";

export const STEPS: IStep[] = [
  {
    stepNumber: "01",
    title: "Primer contacto",
    description:
      "Agenda una llamada o reunión inicial para exponer tu situación y recibir una orientación preliminar sobre los pasos legales a seguir.",
    icon: "contact",
  },
  {
    stepNumber: "02",
    title: "Análisis del caso",
    description:
      "Nuestro equipo revisará tus antecedentes laborales y documentación, evaluando la viabilidad de la demanda y la estimación de tus indemnizaciones.",
    icon: "analysis",
  },
  {
    stepNumber: "03",
    title: "Presentación de la demanda",
    description:
      "Redactamos e ingresamos la demanda ante el tribunal competente, representándote en todas las audiencias y gestiones necesarias durante el juicio.",
    icon: "case-file",
  },
  {
    stepNumber: "04",
    title: "Resultado y pago",
    description:
      "Una vez obtenida la sentencia favorable o acuerdo, te asistimos en la gestión del pago y cumplimiento efectivo de la indemnización.",
    icon: "success",
  },
];
