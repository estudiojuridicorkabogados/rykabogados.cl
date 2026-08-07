import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="flex w-full items-center justify-center bg-white py-12">
      <div className="mx-auto px-6 py-16 lg:max-w-6xl lg:min-w-6xl lg:px-0 2xl:w-7xl 2xl:max-w-7xl">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h1 className="mb-12 text-3xl font-bold text-black lg:text-6xl">
            404
          </h1>

          <h2 className="mb-6 text-3xl font-bold text-black lg:text-5xl">
            Página no encontrada
          </h2>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-700">
            Lo sentimos, la página que buscas no existe o ha sido movida.
            <br />
            Te invitamos a volver a nuestro sitio principal para encontrar la
            información que necesitas sobre nuestros servicios legales.
          </p>

          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
