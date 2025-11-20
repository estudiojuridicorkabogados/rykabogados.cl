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
    videoUrl: "https://www.youtube.com/shorts/4L6DvTapUA0",
  },
  {
    id: "2",
    title: "Despido por Necesidades de la Empresa",
    description:
      "Aprende cuándo este tipo de despido es legal y qué derechos te corresponden. Te mostramos cómo identificar un despido mal aplicado y cómo reclamar las indemnizaciones que te corresponden.",
    videoUrl: "https://youtube.com/shorts/UBB7fy4mRn4?si=j1TxLm_-8ItmbOeO",
  },
  {
    id: "3",
    title: "Autodespido",
    description:
      "Descubre en qué casos puedes poner término a tu contrato por incumplimientos del empleador. En este video te explicamos el procedimiento legal del autodespido y los beneficios que puedes exigir.",
    videoUrl: "https://youtube.com/shorts/zAurtGjy-oc?si=29mHqtlIvBXd2exm",
  },
];
