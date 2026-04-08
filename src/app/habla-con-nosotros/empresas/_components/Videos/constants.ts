export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export const VIDEOS: Video[] = [
  {
    id: "1",
    title:
      "En RK Abogados asesoramos a empresas en procesos de desvinculación laboral:",
    description:
      "Redactamos cartas de despido, calculamos indemnizaciones y brindamos apoyo ante contingencias conforme a la normativa vigente.",
    videoUrl: "https://www.youtube.com/shorts/4L6DvTapUA0",
  },
  {
    id: "2",
    title: "En RK Abogados, prestamos asesoría preventiva en materia laboral:",
    description:
      "Revisamos contratos, reglamentos internos y nos encargamos del cumplimiento normativo de tu empresa.",
    videoUrl: "https://youtube.com/shorts/UBB7fy4mRn4?si=j1TxLm_-8ItmbOeO",
  },
  {
    id: "3",
    title: "En RK Abogados defendemos a empresas frente a demandas laborales:",
    description:
      "Evaluamos la estrategia, riesgos y alternativas, acompañándote durante todo el proceso judicial.",
    videoUrl: "https://youtube.com/shorts/zAurtGjy-oc?si=29mHqtlIvBXd2exm",
  },
];
