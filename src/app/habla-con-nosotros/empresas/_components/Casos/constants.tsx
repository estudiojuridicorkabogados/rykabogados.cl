export interface CasoItem {
  id: string;
  title: string;
  rit: string;
  montoRiesgo?: string;
  montoFinal?: string;
  resultado?: string;
  logroClave: string;
}

export const CASOS_ITEMS: CasoItem[] = [
  {
    id: "1",
    title: "Anulación íntegra de 6 multas simultáneas",
    rit: "RIT I-55-2024 - JLT de Puente Alto",
    montoRiesgo: "$12.800.000 (Aprox.)",
    montoFinal: "$0 (Anulación total)",
    logroClave:
      "Defensa técnica que desvirtuó la base de cálculo de horas extras y bonos colectivos, declarando la nulidad total de la resolución por errores de hecho y derecho.",
  },
  {
    id: "2",
    title: "Validación de sistema de control de asistencia",
    rit: "RIT I-612-2024 - 1° JLT de Santiago",
    montoRiesgo: "$7.900.000 (120 UTM)",
    montoFinal: "$0 (Anulación total)",
    logroClave:
      "Se acreditó que el sistema automatizado de la empresa cumplía con la normativa superior, anulando multas por registros que la Inspección consideraba erróneamente insuficientes.",
  },
  {
    id: "3",
    title: "Defensa por jornadas rotativas y turnos digitales",
    rit: "RIT I-577-2024 - 1° JLT de Santiago",
    montoRiesgo: "$7.900.000 (120 UTM)",
    montoFinal: "$0 (Anulación total)",
    logroClave:
      "El tribunal determinó que la gestión de turnos vía plataforma digital no constituía arbitrariedad, protegiendo la facultad de administración de la compañía.",
  },
  {
    id: "4",
    title: "Desafuero sindical por falta de probidad",
    rit: "RIT I-587-2019 - JLT de Antofagasta",
    resultado: "Demanda acogida con costas",
    logroClave:
      "Se obtuvo la autorización judicial para el desafuero y posterior despido de trabajador con fuero sindical, fundado en falta de probidad e incumplimiento grave de las obligaciones del contrato (Art. 160 N° 1 y 7).",
  },
];
