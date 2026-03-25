"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useCookieConsent } from "@/components/CookieConsent/useCookieConsent";
import { ADDRESS, URLS } from "@/lib/utils/constants";

import logoWhite from "../../public/images/logos/logo_symbol_white.png";

const CURRENT_YEAR = new Date().getFullYear();

import { FacebookIcon } from "./icons/Facebook";
import { InstagramIcon } from "./icons/Instagram";
import { LinkedinIcon } from "./icons/Linkedin";

const PAGE_LINKS = [
  {
    href: URLS.asesoriaTrabajadores(),
    label: "Asesoría Trabajadores",
  },
  {
    href: URLS.asesoriaEmpresas(),
    label: "Asesoría Empresas",
  },
  {
    href: URLS.otrasAreas(),
    label: "Otras Áreas",
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

const FORMALIDAD_LINKS = [
  {
    href: URLS.faq(),
    label: "Preguntas Frecuentes",
  },
  {
    href: URLS.privacyPolicy(),
    label: "Política de Privacidad",
  },
  {
    href: URLS.cookiePolicy(),
    label: "Política de Cookies",
  },
];

export const Footer = () => {
  const pathname = usePathname();
  const { openSettings } = useCookieConsent();

  if (pathname === "/contacto") {
    return null;
  }

  return (
    <footer className="bg-[#252525] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-8 xl:gap-12">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full md:w-auto">
            <div className="mt-2 relative w-full h-[40px] md:w-[179px] md:h-[89px] lg:mb-8">
              <Image
                src={logoWhite}
                alt="logo"
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-contain"
              />
            </div>

            <ul className="hidden lg:block space-y-2 text-center md:text-left">
              {/* <li>
                <span className="text-white font-bold">Paginas</span>
              </li> */}
              {PAGE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white transition-colors hover:text-accent font-light text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="hidden lg:block space-y-2 text-center md:text-left">
              {/* <li>
                <span className="text-white font-bold">Formalidad</span>
              </li> */}
              {FORMALIDAD_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white transition-colors hover:text-accent font-light text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col text-white font-medium gap-8 text-center md:text-left text-sm">
            <span>{ADDRESS}</span>

            <div className="flex flex-col gap-2">
              <span>
                Tel <a href="tel:+56223644258">2 23644258</a> -{" "}
                <a href="tel:+56986395780">9 86395780</a>
              </span>

              <a
                className="hover:text-accent"
                href="mailto:contacto@rkabogados.cl"
                target="_blank"
                rel="noreferrer"
              >
                contacto@rkabogados.cl
              </a>
            </div>

            <div className="flex gap-3 items-center justify-center lg:justify-start">
              <a
                href={URLS.instagram()}
                target="_blank"
                className="bg-white size-6 lg:size-8 rounded-full flex items-center justify-center"
                rel="noreferrer"
              >
                <InstagramIcon className="size-4 lg:size-5 fill-[#252525]" />
              </a>
              <a href={URLS.facebook()} target="_blank" rel="noreferrer">
                <FacebookIcon className="size-6 lg:size-8 fill-white" />
              </a>
              <a href={URLS.linkedin()} target="_blank" rel="noreferrer">
                <LinkedinIcon className="size-6 lg:size-8 fill-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-32 flex flex-col lg:flex-row gap-y-2 gap-x-8 lg:items-center lg:justify-between text-xs text-white/50">
          <p>{`© ${CURRENT_YEAR} RK Abogados · Todos los derechos reservados`}</p>

          <button
            onClick={openSettings}
            className="text-white/50 hover:text-white transition-colors text-left lg:text-center cursor-pointer"
            type="button"
          >
            Configurar cookies
          </button>
        </div>
      </div>
    </footer>
  );
};
