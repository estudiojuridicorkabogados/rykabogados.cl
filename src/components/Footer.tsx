"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { URLS } from "@/lib/utils/constants";

import logoWhite from "../../public/images/logos/logo-white.png";

import { FacebookIcon } from "./icons/Facebook";
import { InstagramIcon } from "./icons/Instagram";
import { LinkedinIcon } from "./icons/Linkedin";

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
          <div className="md:col-span-2 flex">
            <div className="relative w-full h-[40px] md:w-[320px] md:h-[64px] lg:mb-8">
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

          <div className="flex flex-col text-white font-[500] gap-8 text-center md:text-left text-sm lg:text-base">
            <span>
              Antonio Bellet 143, Providencia <br /> Isidora Goyenechea 3000,
              Las Condes
            </span>
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

            <div className="flex gap-3 items-center justify-center lg:justify-start">
              <a href={URLS.instagram()} target="_blank" className="bg-white size-6 lg:size-8 rounded-full flex items-center justify-center">
                <InstagramIcon className="size-4 lg:size-5 fill-[#252525]" />
              </a>
              <a href={URLS.facebook()} target="_blank">
                <FacebookIcon className="size-6 lg:size-8 fill-white" />
              </a>
              <a href={URLS.linkedin()} target="_blank">
                <LinkedinIcon className="size-6 lg:size-8 fill-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-32 flex flex-col lg:flex-row gap-y-0 gap-x-8 lg:items-center lg:justify-between text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} RyK Abogados</p>

          <p>Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
};
