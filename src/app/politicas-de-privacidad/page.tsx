import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | RK Abogados",
  description:
    "Política de privacidad y protección de datos personales de RK Abogados.",
};

export default function PoliticasDePrivacidadPage() {
  return (
    <div className="bg-white w-full">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="lg:max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#252525] mb-8">
            Políticas de Privacidad y Protección de Datos Personales
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">
                1. Introducción y marco normativo
              </h2>
              <p className="text-gray-700 mb-4">
                La presente <b>Política de Privacidad</b> tiene por objeto informar a los clientes, usuarios y
                visitantes del sitio web <a className="underline text-primary font-bold" href="https://www.rkabogados.cl">www.rkabogados.cl</a> sobre el tratamiento que realiza <b>RK Abogados</b> respecto
                de los datos personales que se recopilan a través de sus formularios, plataformas o mecanismos de
                interacción digital.
              </p>
              <p className="text-gray-700 mb-4">
                El tratamiento de datos personales se efectúa en cumplimiento de las siguientes normas y
                recomendaciones aplicables en Chile:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>La Ley N° 19.628 sobre Protección de la Vida Privada.</li>
                <li>El artículo 19 N°4 de la Constitución Política de la República de Chile.</li>
                <li>La Ley N° 20.285 sobre Acceso a la Información Pública.</li>
                <li>La Ley N° 20.575 que establece el principio de finalidad en el tratamiento de datos personales.</li>
                <li>
                  El Decreto Supremo N° 779/2000 del Ministerio de Justicia, que aprueba el Reglamento de Bancos de
                  Datos Personales a Cargo de Organismos Públicos.
                </li>
                <li>
                  Las recomendaciones técnicas del Servicio Nacional del Consumidor (SERNAC) en materia de
                  consentimiento y uso de cookies.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">2. ¿Quiénes somos?</h2>
              <p className="text-gray-700 mb-4">
                Retamales Kowalski Abogados Limitada, RUT 77.703.086-8, es una sociedad constituida conforme a la
                legislación chilena, con domicilio en Antonio Bellet N°143, oficina 609, comuna de Providencia,
                Región Metropolitana.
              </p>
              <p className="text-gray-700 mb-4">
                La sociedad desarrolla sus actividades bajo el nombre comercial RK Abogados, un estudio jurídico
                chileno dedicado a la prestación de servicios de asesoría y representación legal en distintas áreas
                del Derecho.
              </p>
              <p className="text-gray-700 mb-4">
                RK Abogados actúa como responsable del tratamiento de datos personales, conforme al artículo 2 letra
                n) de la Ley N° 19.628. Los datos recolectados a través del sitio web son tratados con estricta
                confidencialidad y seguridad profesional.
              </p>
              <p className="text-gray-700">
                El estudio y su personal se encuentran sujetos al deber de secreto profesional y confidencialidad
                previsto en el artículo 7 de la Ley N° 19.628, obligación que subsiste indefinidamente, incluso
                después de finalizada la relación profesional con el titular de los datos.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">3. Conceptos básicos</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Dato personal:</strong> toda información sobre una persona natural identificada o
                  identificable, tales como nombre, RUT, dirección, correo electrónico, teléfono, profesión,
                  antecedentes laborales, judiciales o patrimoniales.
                </li>
                <li>
                  <strong>Titular de los datos:</strong> la persona natural a la que se refieren los datos personales.
                </li>
                <li>
                  <strong>Tratamiento:</strong> cualquier operación u operaciones sobre datos personales, como su
                  recolección, registro, almacenamiento, uso, comunicación, transmisión o eliminación.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">4. Información que recopilamos</h2>
              <p className="text-gray-700 mb-4">
                RK Abogados recolecta información personal en los siguientes casos:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Cuando el usuario completa formularios de contacto, suscripción o postulación disponibles en el sitio web.</li>
                <li>Cuando contrata nuestros servicios jurídicos o solicita información sobre ellos.</li>
                <li>Cuando navega por nuestro sitio web y autoriza el uso de cookies o tecnologías similares.</li>
              </ul>
              <p className="text-gray-700 mb-4">La información puede incluir, entre otros:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Nombre, RUT, domicilio, correo electrónico y teléfono.</li>
                <li>Nacionalidad, profesión y fecha de nacimiento.</li>
                <li>Antecedentes laborales, judiciales o patrimoniales entregados voluntariamente.</li>
                <li>Datos técnicos de navegación (dirección IP, tipo de dispositivo, páginas visitadas, tiempo de sesión, etc.).</li>
              </ul>
              <p className="text-gray-700">
                El sitio utiliza herramientas como Google Analytics y Vercel, bajo sus propias políticas de privacidad.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">5. Finalidades del tratamiento</h2>
              <p className="text-gray-700 mb-4">
                Los datos personales se utilizan exclusivamente para las siguientes finalidades:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                <li>Responder consultas o solicitudes de contacto realizadas por los usuarios del sitio web.</li>
                <li>Evaluar antecedentes jurídicos con el propósito de entregar orientación o prestar servicios legales.</li>
                <li>Mantener la comunicación y gestión de la relación profesional con los clientes y usuarios.</li>
                <li>Cumplir obligaciones legales o contractuales derivadas de la prestación de servicios jurídicos.</li>
                <li>
                  Elaborar estadísticas internas y bases de datos institucionales, con el objeto de:
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
                    <li>Analizar tendencias generales sobre el uso del sitio y las consultas recibidas.</li>
                    <li>Mejorar la calidad de los servicios ofrecidos y la atención a los usuarios.</li>
                    <li>Diseñar y evaluar estrategias de comunicación, difusión y mejora continua.</li>
                  </ul>
                </li>
                <li>Enviar comunicaciones legales, institucionales o informativas, siempre que el usuario lo haya autorizado expresamente.</li>
              </ol>
              <p className="text-gray-700 mt-4">
                En todos los casos, los datos se tratan conforme al principio de finalidad previsto en la Ley N° 20.575,
                es decir, solo se utilizarán para los fines específicos para los cuales fueron recopilados, y no se
                transferirán a terceros sin autorización expresa del titular o mandato legal.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">6. Base legal del tratamiento</h2>
              <p className="text-gray-700 mb-4">
                El tratamiento de datos personales efectuado por RK Abogados se fundamenta en:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>El consentimiento expreso del titular, conforme al artículo 4 de la Ley N° 19.628.</li>
                <li>La ejecución o preparación de un contrato de prestación de servicios jurídicos.</li>
                <li>El cumplimiento de obligaciones legales o requerimientos de autoridades competentes.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">7. Uso de cookies</h2>
              <h3 className="text-xl font-semibold text-[#252525] mb-3">¿Qué son las cookies?</h3>
              <p className="text-gray-700 mb-4">
                Las cookies son pequeños archivos de texto que se almacenan en el navegador del usuario cuando visita un
                sitio web. Permiten el funcionamiento técnico del sitio, optimizan la experiencia de navegación y ayudan a
                obtener información estadística anónima sobre el comportamiento de los usuarios.
              </p>
              <h3 className="text-xl lg:text-xl font-semibold text-[#252525] mb-3">Tipos de cookies utilizadas</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Cookies esenciales o técnicas: necesarias para el funcionamiento básico del sitio y la navegación segura. No requieren consentimiento.</li>
                <li>Cookies de preferencias o personalización: recuerdan configuraciones elegidas por el usuario (por ejemplo, idioma o región).</li>
                <li>Cookies analíticas o estadísticas: permiten recopilar datos agregados o anonimizados sobre el tráfico y uso del sitio, con el fin de elaborar informes estadísticos o bases de datos internas orientadas a la mejora del servicio.</li>
                <li>Cookies publicitarias o de marketing: se utilizan para ofrecer contenido o comunicaciones adaptadas al interés del usuario, previa autorización expresa.</li>
              </ul>
              <h3 className="text-xl lg:text-xl font-semibold text-[#252525] mb-3">Consentimiento y control</h3>
              <p className="text-gray-700 mb-4">
                El usuario puede aceptar, rechazar o configurar las cookies desde el banner de consentimiento o desde su
                navegador. Las cookies no esenciales permanecerán desactivadas por defecto, y el usuario podrá revocar su
                consentimiento en cualquier momento.
              </p>
              <p className="text-gray-700">
                Los datos que eventualmente se recopilen mediante cookies analíticas o formularios web podrán ser
                utilizados por RK Abogados de manera agregada y anonimizada para fines estadísticos, garantizando que no se
                identifique ni individualice a los usuarios.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">9. Comunicación a terceros</h2>
              <p className="text-gray-700 mb-4">
                RK Abogados no comparte ni cede datos personales a terceros, salvo que:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Exista autorización expresa del titular.</li>
                <li>Sea necesario para la correcta prestación del servicio jurídico solicitado.</li>
                <li>Lo requiera una autoridad judicial o administrativa, en cumplimiento de la ley.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                En tales casos, el estudio exigirá al tercero el cumplimiento de estándares de seguridad equivalentes.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">10. Derechos del titular de los datos</h2>
              <p className="text-gray-700 mb-4">
                De acuerdo con los artículos 12 y siguientes de la Ley N° 19.628, el titular de los datos personales tiene
                derecho a:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Acceder a la información que RK Abogados posee sobre él.</li>
                <li>Solicitar rectificación de datos incorrectos o incompletos.</li>
                <li>Solicitar eliminación o cancelación de datos cuyo almacenamiento carezca de fundamento legal.</li>
                <li>Oponerse al uso de sus datos para fines distintos a los informados.</li>
                <li>Revocar el consentimiento, en cualquier momento.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                El ejercicio de estos derechos es gratuito y no puede ser limitado por acto o convención.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">11. Ejercicio de derechos y contacto</h2>
              <p className="text-gray-700 mb-4">
                Para ejercer los derechos de acceso, rectificación, cancelación, oposición o revocación, el titular puede
                contactar al estudio en:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Correo electrónico: contacto@rkabogados.cl</li>
                <li>Dirección postal: Antonio Bellet N°143, oficina 609, Providencia, Santiago, Chile.</li>
                <li>Plazo de respuesta: máximo dos días hábiles, conforme al artículo 16 de la Ley N° 19.628.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">12. Conservación de los datos</h2>
              <p className="text-gray-700 mb-4">
                Los datos personales recolectados por RK Abogados serán conservados por un período máximo de tres (3) años,
                contados desde la última interacción del titular con el estudio jurídico o desde la finalización de la
                relación contractual o profesional que dio origen a su recolección.
              </p>
              <p className="text-gray-700 mb-4">Este plazo se justifica en la necesidad de:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Mantener respaldos de comunicaciones y antecedentes jurídicos vinculados a consultas o servicios prestados.</li>
                <li>Elaborar estadísticas y bases de datos institucionales con fines de mejora y gestión interna.</li>
                <li>Cumplir obligaciones legales, administrativas o contables que exijan conservar ciertos registros por un período determinado.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Transcurrido dicho plazo, los datos serán eliminados de forma segura o anonimizados, de modo que no sea
                posible identificar al titular. La eliminación se realizará conforme a las medidas técnicas y organizativas
                implementadas por RK Abogados para resguardar la confidencialidad y seguridad de la información.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">13. Actualización de la Política</h2>
              <p className="text-gray-700">
                RK Abogados podrá modificar esta Política de Privacidad para adaptarla a cambios normativos, tecnológicos o
                institucionales. Toda modificación será publicada oportunamente en el sitio web, indicando la fecha de su
                última actualización.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#252525] mb-4">14. Vigencia</h2>
              <p className="text-gray-700">
                La presente Política de Privacidad entra en vigencia desde su publicación en www.rkabogados.cl y será
                aplicable a todos los tratamientos de datos personales realizados por el estudio jurídico RK Abogados.
              </p>
            </section>

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
