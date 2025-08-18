"use client";

import { Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const pathname = usePathname();

  console.log(pathname)

  if (pathname === "/contacto") {
    return null;
  }

  return (
    <footer className="bg-[#252525] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="border-l-4 border-[#AE8D54] pl-4">
                <div className="text-2xl font-bold tracking-wide">
                  Retamales y Kowalski
                </div>
                <div className="text-sm font-light tracking-widest opacity-90">
                  ABOGADOS
                </div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Estudio jurídico especializado en derecho laboral y corporativo.
              Más de 15 años protegiendo tus derechos en Chile.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-[#AE8D54] transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#AE8D54] transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#AE8D54] transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#AE8D54]">
              Servicios
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Derecho Laboral
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Derecho Corporativo
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Derecho Civil
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Litigios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-[#AE8D54]">
              Contacto
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li>+56 2 2345 6789</li>
              <li>contacto@RyKasociados.cl</li>
              <li>Av. Providencia 1234, Providencia, Santiago</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} RyK Abogados. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
