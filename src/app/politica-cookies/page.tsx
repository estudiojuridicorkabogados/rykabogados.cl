import type { Metadata } from "next";
import Link from "next/link";

import { URLS } from "@/lib/utils/constants";

export const metadata: Metadata = {
  title: "Política de Cookies | RK Abogados",
  description:
    "Información sobre el uso de cookies en el sitio web de RK Abogados. Conoce qué cookies utilizamos y cómo gestionarlas.",
};

export default function PoliticaCookiesPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Política de Cookies
          </h1>
          <p className="text-lg text-gray-600">
            Última actualización: 17 de octubre de 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introducción
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              En RK Abogados utilizamos cookies y tecnologías similares para
              mejorar tu experiencia en nuestro sitio web. Esta política explica
              qué son las cookies, cómo las usamos y cómo puedes gestionarlas.
            </p>
          </section>

          {/* What are cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. ¿Qué son las cookies?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Las cookies son pequeños archivos de texto que se almacenan en tu
              dispositivo cuando visitas un sitio web. Se utilizan ampliamente
              para hacer que los sitios web funcionen de manera más eficiente y
              proporcionar información a los propietarios del sitio.
            </p>
          </section>

          {/* Types of cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Tipos de cookies que utilizamos
            </h2>

            <div className="space-y-6">
              {/* Necessary cookies */}
              <div className="border-l-4 border-primary-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  3.1. Cookies necesarias
                </h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Estas cookies son esenciales para que el sitio web funcione
                  correctamente. Sin estas cookies, algunos servicios no pueden
                  ser proporcionados.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Cookie de consentimiento de cookies</li>
                  <li>Cookies de sesión</li>
                  <li>Cookies de preferencias de usuario</li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Duración:</strong> Hasta 1 año
                </p>
              </div>

              {/* Analytics cookies */}
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  3.2. Cookies de análisis y rendimiento
                </h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  Estas cookies nos permiten reconocer y contar el número de
                  visitantes y ver cómo se mueven por nuestro sitio web. Esto
                  nos ayuda a mejorar la forma en que funciona nuestro sitio.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    <strong>Google Analytics:</strong> Para análisis de tráfico
                    y comportamiento de usuarios
                  </li>
                  <li>
                    <strong>Vercel Analytics:</strong> Para métricas de
                    rendimiento y uso del sitio
                  </li>
                  <li>
                    <strong>Vercel Speed Insights:</strong> Para análisis de
                    velocidad de carga
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Duración:</strong> Variable, hasta 2 años
                </p>
              </div>
            </div>
          </section>

          {/* How to manage cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Cómo gestionar tus cookies
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Puedes controlar y/o eliminar las cookies como desees. Tienes las
              siguientes opciones:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>
                <strong>Banner de cookies:</strong> Al visitar nuestro sitio por
                primera vez, puedes aceptar o rechazar las cookies mediante
                nuestro banner.
              </li>
              <li>
                <strong>Configuración personalizada:</strong> Puedes
                personalizar tus preferencias de cookies en cualquier momento
                desde el pie de página de nuestro sitio.
              </li>
              <li>
                <strong>Configuración del navegador:</strong> Puedes eliminar
                todas las cookies que ya están en tu dispositivo y configurar la
                mayoría de los navegadores para evitar que se coloquen.
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Ten en cuenta que si deshabilitas las cookies, es posible que
              algunas funciones del sitio web no funcionen correctamente.
            </p>
          </section>

          {/* Third party cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Cookies de terceros
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Utilizamos servicios de terceros que pueden establecer cookies en
              tu dispositivo:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                <strong>Google Analytics:</strong> Para análisis estadístico del
                tráfico web.{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Política de privacidad de Google
                </a>
              </li>
              <li>
                <strong>Vercel:</strong> Para análisis de rendimiento y
                velocidad.{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  Política de privacidad de Vercel
                </a>
              </li>
            </ul>
          </section>

          {/* Changes to policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Cambios en esta política
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Podemos actualizar esta Política de Cookies ocasionalmente para
              reflejar cambios en las cookies que utilizamos o por otras razones
              operativas, legales o reglamentarias. Por favor, visita esta
              página regularmente para mantenerte informado sobre nuestro uso de
              cookies.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Contacto
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Si tienes alguna pregunta sobre nuestra Política de Cookies, por
              favor contáctanos:
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700">
                <strong>RK Abogados</strong>
                <br />
                Email:{" "}
                <a
                  href="mailto:contacto@rkabogados.cl"
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  contacto@rkabogados.cl
                </a>
              </p>
            </div>
          </section>

          {/* Back to home */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href={URLS.home()}
              className="items-center gap-2 group text-black text-md font-bold hover:text-accent-dark transition-colors duration-200"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
