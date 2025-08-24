"use client";

import { URLS } from "@/utils/constants";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logoWhite from "../../public/images/logo-white.png";
import Image from "next/image";

const LINKS = [
  {
    href: URLS.asesoriaTrabajadores(),
    label: "Asesoría Trabajadores",
  },
  {
    href: URLS.asesoriaEmpresas(),
    label: "Asesoría Empresas",
  },
  {
    href: URLS.blog(),
    label: "Blog",
  },
  {
    href: URLS.contacts(),
    label: "Contacto",
  },
];

export const Footer = () => {
  const pathname = usePathname();

  if (pathname === "/contacto") {
    return null;
  }

  return (
    <footer className="bg-[#252525] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
          <div className="md:col-span-2">
            <div className="relative w-full h-[50px] md:w-[320px] md:h-[64px] mb-8">
              <Image
                src={logoWhite}
                alt="logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <ul className="hidden lg:block space-y-3 text-center md:text-left">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white transition-colors hover:text-accent font-[500]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col text-white font-[500] gap-8 text-center md:text-left">
            <span>Isidora Goyenechea 3000, piso 23, Las Condes, Santiago</span>
            <div className="flex flex-col gap-2">
              <span>Tel 2 23644258</span>
              <a
                className="hover:text-accent"
                href="mailto:estudio.juridico@ryoasociados.cl"
                target="_blank"
              >
                estudio.juridico@ryoasociados.cl
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-32 flex flex-col gap-y-4 gap-x-8 items-center justify-between text-xs text-white">
          <p>&copy; {new Date().getFullYear()} RyK Abogados</p>

          <p>Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};
