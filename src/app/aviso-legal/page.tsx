import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso Legal | RK Abogados",
  description:
    "Aviso legal de RK Abogados. Información sobre condiciones de uso, propiedad intelectual y protección de datos personales.",
};

export default function AvisoLegalPage() {
  return (
    <div className="bg-white w-full">
      <div className="px-6 lg:px-0 py-16 lg:min-w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl mx-auto">
        <div className="lg:max-w-4xl">
          {/* Header */}
          <h1 className="text-4xl lg:text-5xl font-bold text-[#252525] mb-8">
            Aviso Legal
          </h1>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Identificación */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">
                1. Identificación
              </h2>
              <p className="text-gray-700 mb-4">
                En cumplimiento de lo dispuesto en la normativa chilena vigente,
                se informa a los usuarios del sitio web www.rykabogados.cl, los
                datos identificativos de la organización:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Denominación:</strong> RK Abogados
                </li>
                <li>
                  <strong>Actividad:</strong> Servicios de asesoría jurídica y
                  representación legal
                </li>
                <li>
                  <strong>Domicilio:</strong> Santiago, Chile
                </li>
                <li>
                  <strong>Correo electrónico:</strong> contacto@rykabogados.cl
                </li>
              </ul>
            </section>

            {/* Objeto */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">
                2. Objeto
              </h2>
              <p className="text-gray-700 mb-4">
                RK Abogados, responsable del sitio web, pone a disposición de
                los usuarios el presente documento con el que pretende dar
                cumplimiento a las obligaciones dispuestas en la Ley de
                Protección de Datos Personales (Ley N° 19.628) y demás normativa
                vigente en Chile, así como informar a todos los usuarios del
                sitio web respecto de las condiciones de uso del mismo.
              </p>
              <p className="text-gray-700">
                Toda persona que acceda a este sitio web asume el papel de
                usuario, comprometiéndose a la observancia y cumplimiento
                riguroso de las disposiciones aquí dispuestas, así como
                cualquier otra disposición legal que fuera de aplicación.
              </p>
            </section>

            {/* Condiciones de Uso */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">
                3. Condiciones de Uso
              </h2>
              <p className="text-gray-700 mb-4">
                El acceso y uso del sitio web www.rykabogados.cl es gratuito y
                tiene carácter no lucrativo. El usuario se compromete a hacer un
                uso adecuado de los contenidos y servicios que RK Abogados
                ofrece a través de su portal y, con carácter enunciativo pero no
                limitativo, a no emplearlos para:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Incurrir en actividades ilícitas, ilegales o contrarias a la
                  buena fe y al orden público.
                </li>
                <li>
                  Difundir contenidos o propaganda de carácter racista,
                  xenófobo, pornográfico-ilegal, de apología del terrorismo o
                  atentatorio contra los derechos humanos.
                </li>
                <li>
                  Provocar daños en los sistemas físicos y lógicos de RK
                  Abogados, de sus proveedores o de terceras personas,
                  introducir o difundir en la red virus informáticos o
                  cualesquiera otros sistemas físicos o lógicos que sean
                  susceptibles de provocar los daños anteriormente mencionados.
                </li>
                <li>
                  Intentar acceder y, en su caso, utilizar las cuentas de correo
                  electrónico de otros usuarios y modificar o manipular sus
                  mensajes.
                </li>
              </ul>
            </section>

            {/* Propiedad Intelectual e Industrial */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">
                4. Propiedad Intelectual e Industrial
              </h2>
              <p className="text-gray-700 mb-4">
                RK Abogados por sí o como cesionaria, es titular de todos los
                derechos de propiedad intelectual e industrial de su página web,
                así como de los elementos contenidos en la misma (a título
                enunciativo, imágenes, sonido, audio, vídeo, software o textos;
                marcas o logotipos, combinaciones de colores, estructura y
                diseño, selección de materiales usados, programas de ordenador
                necesarios para su funcionamiento, acceso y uso, etc.).
              </p>
              <p className="text-gray-700 mb-4">
                Todos los derechos están reservados de acuerdo con la normativa
                chilena vigente en materia de propiedad intelectual, incluida la
                Ley N° 17.336 sobre Propiedad Intelectual.
              </p>
              <p className="text-gray-700">
                Quedan expresamente prohibidas la reproducción, la distribución
                y la comunicación pública, incluida su modalidad de puesta a
                disposición, de la totalidad o parte de los contenidos de esta
                página web, con fines comerciales, en cualquier soporte y por
                cualquier medio técnico, sin la autorización de RK Abogados.
              </p>
            </section>

            {/* Exclusión de Garantías y Responsabilidad */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">
                5. Exclusión de Garantías y Responsabilidad
              </h2>
              <p className="text-gray-700 mb-4">
                RK Abogados no se hace responsable, en ningún caso, de los daños
                y perjuicios de cualquier naturaleza que pudieran ocasionar, a
                título enunciativo: errores u omisiones en los contenidos, falta
                de disponibilidad del portal o la transmisión de virus o
                programas maliciosos o lesivos en los contenidos, a pesar de
                haber adoptado todas las medidas tecnológicas necesarias para
                evitarlo.
              </p>
            </section>

            {/* Modificaciones */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">
                6. Modificaciones
              </h2>
              <p className="text-gray-700">
                RK Abogados se reserva el derecho de efectuar sin previo aviso
                las modificaciones que considere oportunas en su portal,
                pudiendo cambiar, suprimir o añadir tanto los contenidos y
                servicios que se presten a través de la misma como la forma en
                la que éstos aparezcan presentados o localizados en su portal.
              </p>
            </section>

            {/* Enlaces */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">
                7. Enlaces
              </h2>
              <p className="text-gray-700 mb-4">
                En el caso de que en www.rykabogados.cl se dispusiesen enlaces o
                hipervínculos hacia otros sitios de Internet, RK Abogados no
                ejercerá ningún tipo de control sobre dichos sitios y
                contenidos. En ningún caso RK Abogados asumirá responsabilidad
                alguna por los contenidos de algún enlace perteneciente a un
                sitio web ajeno, ni garantizará la disponibilidad técnica,
                calidad, fiabilidad, exactitud, amplitud, veracidad, validez y
                constitucionalidad de cualquier material o información contenida
                en ninguno de dichos hipervínculos u otros sitios de Internet.
              </p>
            </section>

            {/* Protección de Datos */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">
                8. Protección de Datos Personales
              </h2>
              <p className="text-gray-700 mb-4">
                RK Abogados cumple con las directrices de la Ley N° 19.628 sobre
                Protección de la Vida Privada, la cual tiene por objeto la
                protección de los datos de carácter personal, garantizando el
                derecho a la privacidad de las personas.
              </p>
              <p className="text-gray-700 mb-4">
                Los datos personales que se recogen a través del sitio web son
                tratados con total confidencialidad y son utilizados únicamente
                para los fines para los cuales fueron recabados. RK Abogados no
                cederá, venderá, ni compartirá los datos personales con terceros
                sin el consentimiento expreso del titular.
              </p>
              <p className="text-gray-700">
                Los usuarios tienen derecho a acceder, rectificar, cancelar y
                oponerse al tratamiento de sus datos personales, conforme a lo
                establecido en la legislación vigente.
              </p>
            </section>

            {/* Derecho Aplicable y Jurisdicción */}
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">
                9. Derecho Aplicable y Jurisdicción
              </h2>
              <p className="text-gray-700">
                Para la resolución de todas las controversias o cuestiones
                relacionadas con el presente sitio web o de las actividades en
                él desarrolladas, será de aplicación la legislación chilena, a
                la que se someten expresamente las partes, siendo competentes
                para la resolución de todos los conflictos derivados o
                relacionados con su uso los Juzgados y Tribunales de Santiago de
                Chile.
              </p>
            </section>

            {/* Última actualización */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <strong>Última actualización:</strong> Octubre de 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
