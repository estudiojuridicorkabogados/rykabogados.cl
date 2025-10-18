import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="bg-white py-12 w-full flex items-center justify-center">
      <div className="px-6 lg:px-0 py-16 lg:min-w-6xl lg:max-w-6xl 2xl:max-w-7xl 2xl:w-7xl mx-auto">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <h1 className="text-3xl lg:text-6xl font-bold text-black mb-12">
            404
          </h1>

          <h2 className="text-3xl lg:text-5xl font-bold text-black mb-6">
            Página no encontrada
          </h2>

          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-xl">
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
