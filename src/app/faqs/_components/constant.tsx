interface Faq {
  title: string;
  description: string | React.ReactNode;
  /** Plain-text answer, used for FAQPage structured data when `description` is JSX. */
  plainAnswer?: string;
}

export const FAQS: Faq[] = [
  {
    title: "¿Qué es RK Abogados?",
    plainAnswer:
      "RK Abogados es una firma jurídica chilena que asesora a empresas y personas en la prevención y solución de asuntos legales. Para empresas, actuamos como un equipo legal externo, entregando apoyo preventivo, estratégico y judicial. Para personas y trabajadores, evaluamos, negociamos y representamos asuntos laborales que requieren una defensa jurídica especializada.",
    description: (
      <>
        <p>
          RK Abogados es una firma jurídica chilena que asesora a empresas y
          personas en la prevención y solución de asuntos legales.
        </p>
        <p className="mt-4">
          Para empresas, actuamos como un equipo legal externo, entregando apoyo
          preventivo, estratégico y judicial. Para personas y trabajadores,
          evaluamos, negociamos y representamos asuntos laborales que requieren
          una defensa jurídica especializada.
        </p>
      </>
    ),
  },
  {
    title: "¿En qué áreas del derecho trabajan?",
    plainAnswer:
      "Empresas: derecho laboral empresarial, cumplimiento normativo, investigaciones internas, relaciones sindicales, fiscalizaciones, litigios, contratos comerciales, asuntos societarios, tributarios, propiedad intelectual y compliance. Personas y trabajadores: despido injustificado, autodespido, tutela de derechos fundamentales, cobro de remuneraciones y prestaciones, accidentes y enfermedades laborales, conflictos sindicales y otros asuntos derivados de la relación de trabajo. La disponibilidad del servicio depende de una evaluación previa del asunto, de la especialidad requerida y de la inexistencia de conflictos de interés.",
    description: (
      <>
        <p>
          <strong>Empresas:</strong> derecho laboral empresarial, cumplimiento
          normativo, investigaciones internas, relaciones sindicales,
          fiscalizaciones, litigios, contratos comerciales, asuntos societarios,
          tributarios, propiedad intelectual y compliance.
        </p>
        <p className="mt-4">
          <strong>Personas y trabajadores:</strong> despido injustificado,
          autodespido, tutela de derechos fundamentales, cobro de remuneraciones
          y prestaciones, accidentes y enfermedades laborales, conflictos
          sindicales y otros asuntos derivados de la relación de trabajo.
        </p>
        <p className="mt-4">
          La disponibilidad del servicio depende de una evaluación previa del
          asunto, de la especialidad requerida y de la inexistencia de
          conflictos de interés.
        </p>
      </>
    ),
  },
  {
    title:
      "¿Cómo funcionan y cuánto cuestan las reuniones y asesorías iniciales?",
    plainAnswer:
      "Las reuniones se realizan preferentemente por videollamada. Según el caso y la disponibilidad, también podrán efectuarse por llamada telefónica o de forma presencial. Para empresas: (1) Reunión inicial de diagnóstico, 30 minutos, sin costo, dirigida a empresas que consultan por primera vez y sujeta a evaluación previa y disponibilidad; incluye orientación general, pero no revisión documental exhaustiva, redacción de documentos, cálculos, auditorías, gestiones ni una estrategia jurídica definitiva; si el asunto es compatible con nuestros servicios, enviaremos una propuesta formal dentro de las siguientes 24 horas hábiles. (2) Asesoría estratégica puntual, 30 minutos, 1,25 UF (valor referencial al 26 de agosto de 2026: $51.084 CLP o aproximadamente US$57), destinada a resolver una consulta jurídica específica; no incluye informe escrito, revisión extensa de documentos, redacción de instrumentos, gestiones administrativas ni representación. (3) Asesoría estratégica, 60 minutos, 2,5 UF (valor referencial al 26 de agosto de 2026: $102.168 CLP o aproximadamente US$113), indicada para asuntos complejos; no incluye informes jurídicos extensos, auditorías, redacción de contratos o escritos, gestiones ni representación, salvo contratación adicional. La reunión destinada exclusivamente a cotizar un plan mensual o proyecto permite levantar antecedentes y preparar una propuesta comercial, y no reemplaza una asesoría jurídica específica. Para trabajadores: la evaluación gratuita de 30 minutos está destinada principalmente a asuntos laborales en los que la relación de trabajo haya terminado y se otorga previa evaluación del caso. Para acceder a ella se requiere proporcionar información suficiente para una evaluación preliminar, que el asunto esté dentro de nuestras áreas de trabajo, que no exista conflicto de interés, que los plazos legales y la disponibilidad del equipo permitan revisarlo responsablemente, que el asunto presente viabilidad jurídica, práctica y económica (sin que esto constituya garantía de resultado), y no haber utilizado previamente una evaluación gratuita para la misma persona y el mismo asunto. La reunión incluye orientación preliminar sobre las posibles acciones legales, su viabilidad, los principales riesgos, los antecedentes faltantes y los próximos pasos; si el cliente cuenta con documentación suficiente, también podremos entregar una estimación aproximada del monto que podría reclamarse en una eventual demanda, la cual es preliminar y no constituye una liquidación definitiva ni garantiza el monto que pueda obtenerse. La evaluación gratuita no incluye revisión documental exhaustiva, cálculos definitivos, informes, redacción de escritos, gestiones ni representación judicial. Los asuntos con relación laboral vigente o que requieran un análisis específico podrán ser derivados a una asesoría pagada, cuyo valor y alcance se informarán antes de agendar. Solicitar o reservar una reunión no implica que RK Abogados haya aceptado asumir la representación. Información sobre valores: las equivalencias fueron calculadas con una UF de $40.867,18 y un dólar observado de $911,43 al 26 de agosto de 2026. Los valores en dólares son exclusivamente referenciales. El monto exacto en pesos será informado antes del pago, conforme al valor de la UF vigente. Los honorarios indicados son exentos de IVA.",
    description: (
      <>
        <p>
          Las reuniones se realizan preferentemente por videollamada. Según el
          caso y la disponibilidad, también podrán efectuarse por llamada
          telefónica o de forma presencial.
        </p>

        <p className="mt-6 font-semibold text-black/70">Para empresas</p>

        <p className="mt-4">
          <strong>
            1. Reunión inicial de diagnóstico — 30 minutos, sin costo.
          </strong>{" "}
          Dirigida a empresas que consultan por primera vez y sujeta a
          evaluación previa y disponibilidad. Tiene por finalidad conocer el
          negocio, identificar la necesidad principal, revisar su urgencia y
          recomendar la modalidad de servicio más adecuada.
        </p>
        <p className="mt-4">
          Incluye orientación general, pero no una revisión documental
          exhaustiva, redacción de documentos, cálculos, auditorías, gestiones
          ni una estrategia jurídica definitiva.
        </p>
        <p className="mt-4">
          Si el asunto es compatible con nuestros servicios, enviaremos una
          propuesta formal dentro de las siguientes 24 horas hábiles.
        </p>

        <p className="mt-4">
          <strong>
            2. Asesoría estratégica puntual — 30 minutos, 1,25 UF.
          </strong>{" "}
          Reunión destinada a resolver una consulta jurídica específica. Incluye
          análisis del problema, identificación de los principales riesgos y
          recomendación de próximos pasos.
        </p>
        <p className="mt-4">
          No incluye informe escrito, revisión extensa de documentos, redacción
          de instrumentos, gestiones administrativas ni representación.
        </p>
        <p className="mt-4">
          Valor referencial al 26 de agosto de 2026:{" "}
          <strong>$51.084 CLP o aproximadamente US$57</strong>.
        </p>

        <p className="mt-4">
          <strong>3. Asesoría estratégica — 60 minutos, 2,5 UF.</strong>{" "}
          Indicada para asuntos complejos o que involucren varias materias
          relacionadas. Incluye análisis jurídico, evaluación de riesgos y
          alternativas, propuesta preliminar de estrategia y un informe breve
          con los temas tratados y las principales conclusiones o
          recomendaciones entregadas.
        </p>
        <p className="mt-4">
          No incluye informes jurídicos extensos, auditorías, redacción de
          contratos o escritos, gestiones ni representación, salvo contratación
          adicional.
        </p>
        <p className="mt-4">
          Valor referencial al 26 de agosto de 2026:{" "}
          <strong>$102.168 CLP o aproximadamente US$113</strong>.
        </p>
        <p className="mt-4">
          La reunión destinada exclusivamente a cotizar un plan mensual o
          proyecto permite levantar antecedentes y preparar una propuesta
          comercial. No reemplaza una asesoría jurídica específica.
        </p>

        <p className="mt-6 font-semibold text-black/70">Para trabajadores</p>

        <p className="mt-4">
          La evaluación gratuita de 30 minutos está destinada principalmente a
          asuntos laborales en los que la relación de trabajo haya terminado y
          se otorga previa evaluación del caso.
        </p>
        <p className="mt-4">Para acceder a ella se requiere:</p>
        <ul className="mt-3 list-disc pl-5">
          <li>
            Proporcionar información suficiente para efectuar una evaluación
            preliminar.
          </li>
          <li>
            Que el asunto se encuentre dentro de nuestras áreas de trabajo.
          </li>
          <li>Que no exista conflicto de interés.</li>
          <li>
            Que los plazos legales y la disponibilidad del equipo permitan
            revisarlo responsablemente.
          </li>
          <li>
            Que, a partir de los antecedentes preliminares, el asunto presente
            viabilidad jurídica, práctica y económica. Esto supone que exista
            una probabilidad razonable de éxito y una relación proporcionada
            entre el eventual beneficio para el cliente, los costos y el trabajo
            que exigiría el caso, y que RK Abogados pueda asumirlo
            responsablemente conforme a su modelo de servicio y disponibilidad.
            Esta evaluación es individual y no constituye una garantía de
            resultado.
          </li>
          <li>
            No haber utilizado previamente una evaluación gratuita para la misma
            persona y el mismo asunto.
          </li>
        </ul>
        <p className="mt-4">
          La reunión incluye orientación preliminar sobre las posibles acciones
          legales, su viabilidad, los principales riesgos, los antecedentes
          faltantes y los próximos pasos. Si el cliente cuenta con documentación
          suficiente, también podremos entregar una estimación aproximada del
          monto que podría reclamarse en una eventual demanda.
        </p>
        <p className="mt-4">
          Esta estimación es preliminar, no constituye una liquidación
          definitiva ni garantiza el monto que pueda obtenerse. Podrá variar
          después de la revisión completa de los antecedentes, de la prueba
          disponible y de las defensas de la contraparte.
        </p>
        <p className="mt-4">
          La evaluación gratuita no incluye revisión documental exhaustiva,
          cálculos definitivos, informes, redacción de escritos, gestiones ni
          representación judicial.
        </p>
        <p className="mt-4">
          Los asuntos con relación laboral vigente o que requieran un análisis
          específico podrán ser derivados a una asesoría pagada, cuyo valor y
          alcance se informarán antes de agendar.
        </p>
        <p className="mt-4">
          Solicitar o reservar una reunión no implica que RK Abogados haya
          aceptado asumir la representación.
        </p>

        <div className="mt-6 rounded-lg bg-gray-100 p-4 text-sm text-black/60">
          <strong>Información sobre valores:</strong> las equivalencias fueron
          calculadas con una UF de $40.867,18 y un dólar observado de $911,43 al
          26 de agosto de 2026. Los valores en dólares son exclusivamente
          referenciales. El monto exacto en pesos será informado antes del pago,
          conforme al valor de la UF vigente. Los honorarios indicados son
          exentos de IVA.
        </div>
      </>
    ),
  },
  {
    title: "¿Atienden asuntos fuera de Santiago?",
    plainAnswer:
      "Sí. Atendemos empresas y personas en todo Chile. Las reuniones se realizan preferentemente por videollamada, lo que permite una atención ágil y continuidad del servicio sin importar la ubicación. La atención telefónica o presencial podrá coordinarse cuando las características del asunto y la disponibilidad del equipo lo permitan.",
    description: (
      <>
        <p>
          Sí. Atendemos empresas y personas en todo Chile. Las reuniones se
          realizan preferentemente por videollamada, lo que permite una atención
          ágil y continuidad del servicio sin importar la ubicación.
        </p>
        <p className="mt-4">
          La atención telefónica o presencial podrá coordinarse cuando las
          características del asunto y la disponibilidad del equipo lo permitan.
        </p>
      </>
    ),
  },
  {
    title: "¿Qué antecedentes debo presentar en la primera reunión?",
    plainAnswer:
      "Dependerá del tipo de asunto. Empresas: contratos, anexos, reglamentos, políticas internas, cartas, fiscalizaciones, multas, comunicaciones, antecedentes societarios, contratos comerciales y una breve cronología del problema. Personas y trabajadores: contrato de trabajo, liquidaciones, carta de despido, finiquito, certificados, correos, mensajes y cualquier antecedente relacionado con el conflicto laboral. Si no cuentas con todos los documentos, igualmente podremos indicarte cuáles son necesarios y cómo obtenerlos. Recomendamos no enviar datos personales o sensibles que no sean pertinentes para la evaluación.",
    description: (
      <>
        <p>Dependerá del tipo de asunto.</p>
        <p className="mt-4">
          <strong>Empresas:</strong> contratos, anexos, reglamentos, políticas
          internas, cartas, fiscalizaciones, multas, comunicaciones,
          antecedentes societarios, contratos comerciales y una breve cronología
          del problema.
        </p>
        <p className="mt-4">
          <strong>Personas y trabajadores:</strong> contrato de trabajo,
          liquidaciones, carta de despido, finiquito, certificados, correos,
          mensajes y cualquier antecedente relacionado con el conflicto laboral.
        </p>
        <p className="mt-4">
          Si no cuentas con todos los documentos, igualmente podremos indicarte
          cuáles son necesarios y cómo obtenerlos. Recomendamos no enviar datos
          personales o sensibles que no sean pertinentes para la evaluación.
        </p>
      </>
    ),
  },
  {
    title: "¿Cuánto tiempo toma resolver un asunto legal?",
    description:
      "Depende de la complejidad, los antecedentes disponibles, la colaboración de las partes y los plazos de tribunales o autoridades. Una gestión preventiva o contractual puede resolverse en un plazo breve, mientras que un procedimiento administrativo o judicial puede requerir varias etapas. Después de evaluar el asunto, te informaremos los pasos previstos y una estimación razonable de tiempos, sin prometer plazos que dependan de terceros.",
  },
  {
    title:
      "¿Cómo se determinan los honorarios y cuáles son los medios de pago?",
    plainAnswer:
      "Antes de iniciar cualquier servicio pagado informaremos su alcance, honorarios, forma de cálculo y eventuales gastos asociados. Medios de pago: efectivo, transferencia bancaria o link de pago. Modalidades de contratación y honorarios: Asesoría (precio fijo por una reunión con duración y alcance previamente definidos), Cotización por proyecto (honorarios asociados a entregables, etapas y plazos específicos), Tarifa por hora (cobro según el tiempo efectivamente destinado al servicio), Plan mensual para empresas (bolsa de horas con presupuesto y reporte mensual), Honorarios a resultado (disponibles únicamente para determinados casos de trabajadores previamente admitidos; el porcentaje se aplica al beneficio económico efectivamente obtenido y queda establecido por escrito), y Cuotas o pagos por etapas (podrán acordarse según las características y duración del servicio). Los honorarios profesionales son distintos de los gastos externos, como aranceles, notarías, receptores, peritajes, traslados o costos administrativos. Cuando corresponda, estos gastos serán informados separadamente.",
    description: (
      <>
        <p>
          Antes de iniciar cualquier servicio pagado informaremos su alcance,
          honorarios, forma de cálculo y eventuales gastos asociados.
        </p>
        <p className="mt-4">
          <strong>Medios de pago:</strong> efectivo, transferencia bancaria o
          link de pago.
        </p>
        <p className="mt-4">
          <strong>Modalidades de contratación y honorarios:</strong>
        </p>
        <ul className="mt-3 list-disc pl-5">
          <li>
            <strong>Asesoría:</strong> precio fijo por una reunión con duración
            y alcance previamente definidos.
          </li>
          <li>
            <strong>Cotización por proyecto:</strong> honorarios asociados a
            entregables, etapas y plazos específicos.
          </li>
          <li>
            <strong>Tarifa por hora:</strong> cobro según el tiempo
            efectivamente destinado al servicio.
          </li>
          <li>
            <strong>Plan mensual para empresas:</strong> bolsa de horas con
            presupuesto y reporte mensual.
          </li>
          <li>
            <strong>Honorarios a resultado:</strong> disponibles únicamente para
            determinados casos de trabajadores previamente admitidos. El
            porcentaje se aplica al beneficio económico efectivamente obtenido y
            queda establecido por escrito.
          </li>
          <li>
            <strong>Cuotas o pagos por etapas:</strong> podrán acordarse según
            las características y duración del servicio.
          </li>
        </ul>
        <p className="mt-4">
          Los honorarios profesionales son distintos de los gastos externos,
          como aranceles, notarías, receptores, peritajes, traslados o costos
          administrativos. Cuando corresponda, estos gastos serán informados
          separadamente.
        </p>
      </>
    ),
  },
  {
    title: "¿Cómo puedo agendar una reunión?",
    plainAnswer:
      "Puedes contactarnos mediante el formulario web, WhatsApp, teléfono o correo electrónico. Te solicitaremos algunos antecedentes para identificar el tipo de servicio adecuado y confirmar la disponibilidad. Respondemos dentro de las siguientes 24 horas hábiles. La reserva queda confirmada cuando recibes nuestra comunicación de confirmación. Agendar una reunión no implica la aceptación automática de una representación judicial o administrativa.",
    description: (
      <>
        <p>
          Puedes contactarnos mediante el formulario web, WhatsApp, teléfono o
          correo electrónico.
        </p>
        <p className="mt-4">
          Te solicitaremos algunos antecedentes para identificar el tipo de
          servicio adecuado y confirmar la disponibilidad. Respondemos dentro de
          las siguientes 24 horas hábiles.
        </p>
        <p className="mt-4">
          La reserva queda confirmada cuando recibes nuestra comunicación de
          confirmación. Agendar una reunión no implica la aceptación automática
          de una representación judicial o administrativa.
        </p>
      </>
    ),
  },
  {
    title: "¿Qué respaldo ofrece RK Abogados durante el servicio?",
    plainAnswer:
      "No vendemos promesas de resultados: entregamos método, equipo y trazabilidad. Ningún abogado responsable puede garantizar el resultado de un juicio, negociación o procedimiento que depende de hechos, pruebas, terceros o autoridades. Lo que sí comprometemos es: una evaluación honesta de riesgos y alternativas; alcance y honorarios informados antes de contratar; un abogado responsable y un abogado de respaldo; seguimiento de plazos y tareas; comunicación clara sobre avances y decisiones relevantes; confidencialidad y secreto profesional conforme a la ley y a las normas éticas; y registro de las gestiones realizadas y, en los planes empresariales, un reporte mensual de horas y actividades. Nuestro objetivo es que cada cliente pueda tomar decisiones informadas, con una estrategia clara y un equipo que responda.",
    description: (
      <>
        <p>
          No vendemos promesas de resultados: entregamos método, equipo y
          trazabilidad. Ningún abogado responsable puede garantizar el resultado
          de un juicio, negociación o procedimiento que depende de hechos,
          pruebas, terceros o autoridades.
        </p>
        <p className="mt-4">Lo que sí comprometemos es:</p>
        <ul className="mt-3 list-disc pl-5">
          <li>Una evaluación honesta de riesgos y alternativas.</li>
          <li>Alcance y honorarios informados antes de contratar.</li>
          <li>Un abogado responsable y un abogado de respaldo.</li>
          <li>Seguimiento de plazos y tareas.</li>
          <li>Comunicación clara sobre avances y decisiones relevantes.</li>
          <li>
            Confidencialidad y secreto profesional conforme a la ley y a las
            normas éticas.
          </li>
          <li>
            Registro de las gestiones realizadas y, en los planes empresariales,
            un reporte mensual de horas y actividades.
          </li>
        </ul>
        <p className="mt-4">
          Nuestro objetivo es que cada cliente pueda tomar decisiones
          informadas, con una estrategia clara y un equipo que responda.
        </p>
      </>
    ),
  },
  {
    title: "¿Trabajan con emprendimientos, PYMEs y empresas de mayor tamaño?",
    plainAnswer:
      "Sí. Diseñamos servicios para empresas de distintas etapas y tamaños. Para una PYME, contar con un plan mensual permite acceder a un equipo jurídico sin asumir el costo fijo de un departamento legal interno. El servicio ayuda a prevenir contingencias, ordenar la documentación, responder consultas y actuar oportunamente frente a fiscalizaciones, conflictos o demandas. Los planes comienzan actualmente en 11 UF mensuales por cinco horas de servicio. Valor referencial al 26 de agosto de 2026: $449.539 CLP o aproximadamente US$494. A mayor cantidad de horas contratadas, menor es el valor de los honorarios por hora, lo que mejora la eficiencia del presupuesto para empresas con necesidades jurídicas recurrentes.",
    description: (
      <>
        <p>
          Sí. Diseñamos servicios para empresas de distintas etapas y tamaños.
        </p>
        <p className="mt-4">
          Para una PYME, contar con un plan mensual permite acceder a un equipo
          jurídico sin asumir el costo fijo de un departamento legal interno. El
          servicio ayuda a prevenir contingencias, ordenar la documentación,
          responder consultas y actuar oportunamente frente a fiscalizaciones,
          conflictos o demandas.
        </p>
        <p className="mt-4">
          Los planes comienzan actualmente en{" "}
          <strong>11 UF mensuales por cinco horas de servicio</strong>. Valor
          referencial al 26 de agosto de 2026:{" "}
          <strong>$449.539 CLP o aproximadamente US$494</strong>. A mayor
          cantidad de horas contratadas, menor es el valor de los honorarios por
          hora, lo que mejora la eficiencia del presupuesto para empresas con
          necesidades jurídicas recurrentes.
        </p>
      </>
    ),
  },
  {
    title: "¿Qué puedo hacer si tengo una inquietud sobre el servicio?",
    plainAnswer:
      "Te recomendamos comunicarla primero al abogado responsable para revisarla de manera rápida y directa. Si la situación no se resuelve, puedes escribir a contacto@rkabogados.cl o comunicarte por nuestros canales oficiales. Revisaremos el alcance contratado, las comunicaciones y las gestiones realizadas, y entregaremos una respuesta clara junto con las medidas que correspondan. Este procedimiento no limita los derechos que la normativa vigente reconozca al cliente.",
    description: (
      <>
        <p>
          Te recomendamos comunicarla primero al abogado responsable para
          revisarla de manera rápida y directa. Si la situación no se resuelve,
          puedes escribir a{" "}
          <a
            href="mailto:contacto@rkabogados.cl"
            className="underline underline-offset-2"
          >
            contacto@rkabogados.cl
          </a>{" "}
          o comunicarte por nuestros canales oficiales.
        </p>
        <p className="mt-4">
          Revisaremos el alcance contratado, las comunicaciones y las gestiones
          realizadas, y entregaremos una respuesta clara junto con las medidas
          que correspondan. Este procedimiento no limita los derechos que la
          normativa vigente reconozca al cliente.
        </p>
      </>
    ),
  },
  {
    title: "¿Cómo trabaja el equipo asignado a mi asunto?",
    description:
      "Cada asunto cuenta con un abogado responsable, quien dirige la estrategia y mantiene el contacto principal con el cliente, y con un abogado de respaldo, que conoce los antecedentes relevantes y permite mantener la continuidad del servicio. Cuando la materia lo requiere, también participan abogados de otras especialidades y procuradores. Así, el asunto no depende exclusivamente de la disponibilidad de una sola persona. En los planes para empresas, las solicitudes, horas y gestiones quedan registradas y se informan mediante un reporte mensual.",
  },
  {
    title: "¿Qué modalidad conviene a mi empresa?",
    plainAnswer:
      "Depende de la frecuencia y naturaleza de sus necesidades: Plan mensual (recomendado para consultas recurrentes, prevención, contratos, cumplimiento y acompañamiento permanente; entrega un presupuesto predecible, menor valor hora por volumen, reporte mensual y posibilidad de ajustar el plan; los planes son renovables mensualmente y no exigen permanencia de largo plazo); Tarifa por hora (adecuada para requerimientos puntuales o de alcance variable; la tarifa de referencia para servicios fuera de plan es de 2,5 UF por hora, salvo que se informe una cotización distinta); Proyecto con cotización (conveniente cuando existen entregables definidos, como contratos, auditorías, reorganizaciones o defensas judiciales); Asesoría estratégica (permite resolver una consulta concreta antes de decidir si se requiere un proyecto o acompañamiento permanente). La reunión inicial nos permite recomendar la alternativa más eficiente para tu empresa, sin sobredimensionar el servicio.",
    description: (
      <>
        <p>Depende de la frecuencia y naturaleza de sus necesidades:</p>
        <ul className="mt-3 list-disc pl-5">
          <li>
            <strong>Plan mensual:</strong> recomendado para consultas
            recurrentes, prevención, contratos, cumplimiento y acompañamiento
            permanente. Entrega un presupuesto predecible, menor valor hora por
            volumen, reporte mensual y posibilidad de ajustar el plan. Los
            planes son renovables mensualmente y no exigen permanencia de largo
            plazo.
          </li>
          <li>
            <strong>Tarifa por hora:</strong> adecuada para requerimientos
            puntuales o de alcance variable. La tarifa de referencia para
            servicios fuera de plan es de 2,5 UF por hora, salvo que se informe
            una cotización distinta.
          </li>
          <li>
            <strong>Proyecto con cotización:</strong> conveniente cuando existen
            entregables definidos, como contratos, auditorías, reorganizaciones
            o defensas judiciales.
          </li>
          <li>
            <strong>Asesoría estratégica:</strong> permite resolver una consulta
            concreta antes de decidir si se requiere un proyecto o
            acompañamiento permanente.
          </li>
        </ul>
        <p className="mt-4">
          La reunión inicial nos permite recomendar la alternativa más eficiente
          para tu empresa, sin sobredimensionar el servicio.
        </p>
      </>
    ),
  },
  {
    title: "¿Qué puede resolver mi empresa con una hora de asesoría?",
    plainAnswer:
      "Una hora bien dirigida puede rendir bastante. Según la complejidad y siempre que se cuente con antecedentes completos, puede destinarse a una o más gestiones sencillas, por ejemplo: redactar o revisar un anexo de contrato simple; realizar una reunión de hasta 20 minutos y complementar la respuesta con una breve revisión o instrucciones por escrito; redactar o revisar una carta de amonestación; resolver una consulta jurídica específica y entregar recomendaciones concretas por correo; revisar un documento breve y formular observaciones puntuales. Estos ejemplos son referenciales y no significan que todas las gestiones puedan completarse conjuntamente dentro de una misma hora. El tiempo dependerá de la extensión, complejidad y calidad de los antecedentes. Si una solicitud puede exceder el tiempo disponible, lo informaremos antes de ejecutarla para que la empresa mantenga control sobre su presupuesto.",
    description: (
      <>
        <p>
          Una hora bien dirigida puede rendir bastante. Según la complejidad y
          siempre que se cuente con antecedentes completos, puede destinarse a
          una o más gestiones sencillas, por ejemplo:
        </p>
        <ul className="mt-3 list-disc pl-5">
          <li>Redactar o revisar un anexo de contrato simple.</li>
          <li>
            Realizar una reunión de hasta 20 minutos y complementar la respuesta
            con una breve revisión o instrucciones por escrito.
          </li>
          <li>Redactar o revisar una carta de amonestación.</li>
          <li>
            Resolver una consulta jurídica específica y entregar recomendaciones
            concretas por correo.
          </li>
          <li>
            Revisar un documento breve y formular observaciones puntuales.
          </li>
        </ul>
        <p className="mt-4">
          Estos ejemplos son referenciales y no significan que todas las
          gestiones puedan completarse conjuntamente dentro de una misma hora.
          El tiempo dependerá de la extensión, complejidad y calidad de los
          antecedentes. Si una solicitud puede exceder el tiempo disponible, lo
          informaremos antes de ejecutarla para que la empresa mantenga control
          sobre su presupuesto.
        </p>
      </>
    ),
  },
  {
    title:
      "¿La asesoría inicial significa que RK Abogados ya asumió mi representación?",
    description:
      "No. La asesoría o evaluación inicial es una instancia de orientación y diagnóstico. La representación comienza únicamente cuando RK Abogados confirma por escrito la aceptación del asunto, el cliente acepta la propuesta de honorarios y se suscriben el contrato, mandato o documentos que correspondan. Hasta ese momento, la persona o empresa debe resguardar sus propios plazos legales, salvo que RK Abogados haya asumido expresamente esa responsabilidad.",
  },
  {
    title: "¿Puede RK Abogados decidir no asumir un asunto?",
    plainAnswer:
      "Sí. Después de la evaluación podemos determinar que no corresponde asumir una asesoría o representación por razones profesionales y objetivas, tales como: el asunto se encuentra fuera de nuestras áreas de trabajo o existe un conflicto de interés; no se cuenta con información suficiente o los plazos legales no permiten una actuación responsable; la capacidad disponible del equipo es insuficiente; la estrategia solicitada es improcedente o contraria a la ley o a la ética profesional; la evaluación técnica, práctica o económica no permite recomendar responsablemente la acción propuesta. La decisión no se fundará en criterios arbitrarios o discriminatorios. Cuando sea posible, indicaremos alternativas, antecedentes faltantes o una vía de derivación.",
    description: (
      <>
        <p>
          Sí. Después de la evaluación podemos determinar que no corresponde
          asumir una asesoría o representación por razones profesionales y
          objetivas, tales como:
        </p>
        <ul className="mt-3 list-disc pl-5">
          <li>
            El asunto se encuentra fuera de nuestras áreas de trabajo o existe
            un conflicto de interés.
          </li>
          <li>
            No se cuenta con información suficiente o los plazos legales no
            permiten una actuación responsable.
          </li>
          <li>La capacidad disponible del equipo es insuficiente.</li>
          <li>
            La estrategia solicitada es improcedente o contraria a la ley o a la
            ética profesional.
          </li>
          <li>
            La evaluación técnica, práctica o económica no permite recomendar
            responsablemente la acción propuesta.
          </li>
        </ul>
        <p className="mt-4">
          La decisión no se fundará en criterios arbitrarios o discriminatorios.
          Cuando sea posible, indicaremos alternativas, antecedentes faltantes o
          una vía de derivación.
        </p>
      </>
    ),
  },
];
