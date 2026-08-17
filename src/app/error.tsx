"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  return (
    <div className="flex w-full items-center justify-center bg-white py-12">
      <div className="mx-auto px-6 py-16 lg:max-w-6xl lg:min-w-6xl lg:px-0 2xl:w-7xl 2xl:max-w-7xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="mb-6 text-3xl font-bold text-black lg:text-5xl">
            Algo salió mal
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-700">
            Ocurrió un error inesperado al cargar esta página. Puedes intentarlo
            nuevamente o volver al inicio.
            <br />
            Si el problema persiste, escríbenos y te ayudamos.
          </p>

          {error.digest && (
            <p className="mb-8 font-mono text-xs text-gray-400">
              Referencia: {error.digest}
            </p>
          )}

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            {/* retry() re-fetches and re-renders the segment's Server Components,
                so a transient failure (e.g. Contentful timing out) can recover
                without a full page reload. */}
            <Button onClick={() => retry()} animateOnClick>
              Intentar nuevamente
            </Button>

            <Button asChild variant="outline">
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
