export interface PressItem {
  id: string;
  publication: string;
  date: string;
  title: string;
  description: React.ReactNode;
  image: string;
  className: string;
}

const pressImages = {
  press01: "/images/noticias/andacosino.webp",
  press02: "/images/noticias/bbcl.webp",
  press03: "/images/noticias/meganoticia.webp",
};

export const PRESS_ITEMS: PressItem[] = [
  {
    id: "1",
    publication: "San Carlos Online",
    date: "Diciembre 15, 2021",
    title: "Indemnización por vulneración de la integridad del trabajador",
    description: (
      <>
        <p>
          El Juzgado de Letras de Andacollo condenó a una empresa minera a pagar
          más de $30 millones de pesos a un ex trabajador que acreditó haber
          sido agredido verbalmente y vulnerado en su integridad física y
          psicológica durante su relación laboral.
        </p>
        <p>
          El caso fue liderado por nuestra abogada Camila Retamales, quien logró
          demostrar la responsabilidad del empleador y obtener una sentencia que
          reconoce el daño moral y la importancia de la dignidad en el trabajo.
        </p>
        <p>
          La resolución tuvo amplia difusión en medios nacionales como
          Meganoticias, BBC Chile y Diario El Andacollino, marcando un
          precedente relevante en la defensa de los derechos laborales en Chile.
        </p>
      </>
    ),
    image: pressImages.press01,
    className: "top-0 lg:top-[120px] left-[5px] lg:left-[30px] rotate-[351deg]",
  },
  {
    id: "2",
    publication: "BBCL",
    date: "Diciembre 15, 2021",
    title: "Despido injustificado: cómo reconocerlo y reclamar",
    description: (
      <>
        <p>
          El Juzgado de Letras del Trabajo de Coyhaique acogió la acción de
          tutela por vulneración de la garantía de indemnidad en contra de
          BancoEstado Servicios de Cobranza S.A., tras comprobar que el despido
          del trabajador se produjo como represalia por haber participado
          activamente en una fiscalización de la Dirección del Trabajo contra su
          empleador.
        </p>
        <p>
          El tribunal determinó que la desvinculación carecía de fundamentos
          objetivos y que el motivo real fue castigar al trabajador por ejercer
          sus derechos, configurando así una vulneración grave a la garantía
          constitucional de indemnidad, que protege a quienes denuncian
          irregularidades laborales o colaboran con organismos fiscalizadores.
        </p>
        <p>
          En su sentencia, el tribunal condenó al empleador al pago de una
          indemnización total cercana a los $12 millones de pesos, además de
          reajustes, intereses, costas procesales y una medida de reparación
          pública, consistente en ofrecer disculpas al trabajador y realizar una
          capacitación obligatoria sobre derechos fundamentales para su
          personal.
        </p>
        <p>
          El caso fue liderado por los abogados Bastián Morales y Nicole Ulloa,
          quienes lograron acreditar la naturaleza represiva del despido y
          consolidar un precedente relevante en materia de protección de
          derechos fundamentales de los trabajadores.
        </p>
      </>
    ),
    image: pressImages.press02,
    className:
      "top-[100px] lg:top-[280px] left-[35px] lg:left-[105px] rotate-[15deg]",
  },
  {
    id: "3",
    publication: "BBCL",
    date: "Diciembre 15, 2021",
    title: "Autodespido y condena solidaria contra empresa mandante",
    description: (
      <>
        <p>
          El Juzgado de Letras del Trabajo de Santiago acogió la demanda de
          autodespido presentada por un ex trabajador del área eléctrica,
          representado por la abogada Camila Retamales de RK Abogados,
          declarando que la empresa Compañía General de Electricidad (CGE) debía
          responder solidariamente junto a Tecnet S.A. por las obligaciones
          laborales y previsionales incumplidas.
        </p>
        <p>
          El tribunal reconoció la existencia de una relación de subcontratación
          permanente, estableciendo que CGE actuó como empresa principal
          responsable solidaria de todas las prestaciones.
        </p>
        <p>
          La sentencia ordenó el pago de más de $62 millones de pesos,
          correspondientes a indemnizaciones,, además de $4 millones por costas.
        </p>
        <p>
          Este fallo reafirma la importancia de la responsabilidad solidaria del
          mandante frente a incumplimientos de sus contratistas y consolida la
          experiencia de RK Abogados en la defensa de trabajadores del sector
          energético.
        </p>
      </>
    ),
    image: pressImages.press03,
    className:
      "lg:top-[190px] -right-[10px] lg:right-0 rotate-[25deg] lg:rotate-[335deg]",
  },
];
