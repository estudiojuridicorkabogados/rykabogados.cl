export interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
}

export const VIDEOS: Video[] = [
  {
    id: "1",
    title: "¿Qué es la subcontratación?",
    description:
      " Es cuando trabajas en una empresa, pero a beneficio de otra. En estos casos, ambas son responsables de tus derechos laborales. Dudas y discusiones. ¿Es subcontratación? ¡Conversemos!",
    videoUrl: "https://www.youtube.com/shorts/4L6DvTapUA0",
  },
  {
    id: "2",
    title: "¿Qué significa tener fuero sindical?",
    description:
      "Significa protección frente al despido. Si eres dirigente sindical, no te pueden desvincular sin la autorización de un tribunal laboral, aún por causas justificadas. Esto es un derecho clave para que puedas ejercer la representación sin miedo ni presión. Si necesitas ayuda sobre esta materia, no dudes en contactarte con nosotros.",
    videoUrl: "https://youtube.com/shorts/UBB7fy4mRn4?si=j1TxLm_-8ItmbOeO",
  },
  {
    id: "3",
    title: "¿Te han acusado de falta de probidad en el trabajo? ",
    description:
      "Cuidado: es una de las causales más graves de despido y permite al empleador no pagar indemnización alguna. Pero, ¿es siempre justa? La falta de probidad es una acusación seria, pero también es mal utilizada por algunos empleadores para desvincular a trabajadores sin pagar lo que les corresponde.",
    videoUrl: "https://youtube.com/shorts/zAurtGjy-oc?si=29mHqtlIvBXd2exm",
  },
];
