export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export const VIDEOS: Video[] = [
  {
    id: "1",
    title: "Despido Injustificado",
    description:
      "Conoce qué hacer si fuiste despedido sin causa justificada. En este video te explicamos tus derechos, los pasos legales a seguir y cómo obtener una indemnización conforme a la ley chilena.",
    videoUrl: "https://www.youtube.com/shorts/o48pJXReb6M?feature=share",
  },
  {
    id: "2",
    title: "Despido por Necesidades de la Empresa",
    description:
      "Aprende cuándo este tipo de despido es legal y qué derechos te corresponden. Te mostramos cómo identificar un despido mal aplicado y cómo reclamar las indemnizaciones que te corresponden.",
    videoUrl: "https://www.youtube.com/shorts/XEjhFoujOVc?feature=share",
  },
  {
    id: "3",
    title: "Autodespido",
    description:
      "Descubre en qué casos puedes poner término a tu contrato por incumplimientos del empleador. En este video te explicamos el procedimiento legal del autodespido y los beneficios que puedes exigir.",
    videoUrl: "https://www.youtube.com/shorts/PZWTNkP0M4k?feature=share",
  },
];
