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
    <footer className="bg-[#252525] pt-16 pb-8 text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-8 xl:gap-12">
          <div className="flex w-full flex-col gap-8 md:w-auto md:flex-row md:gap-16">
            <div className="relative mt-2 h-[40px] w-full md:h-[89px] md:w-[179px] lg:mb-8">
              <Image
                src={logoWhite}
                alt="RK Abogados"
                fill
                sizes="(max-width: 768px) 60vw, 179px"
                className="object-contain"
              />
            </div>

            <ul className="hidden space-y-2 text-center md:text-left lg:block">
              {/* <li>
                <span className="text-white font-bold">Paginas</span>
              </li> */}
              {PAGE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-accent text-sm font-light text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="hidden space-y-2 text-center md:text-left lg:block">
              {/* <li>
                <span className="text-white font-bold">Formalidad</span>
              </li> */}
              {FORMALIDAD_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-accent text-sm font-light text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8 text-center text-sm font-medium text-white md:text-left">
            <span>{ADDRESS}</span>

            <div className="flex flex-col gap-2">
              <span>
                Tel <a href="tel:+56233808828">2 33808828</a> -{" "}
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

            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <a
                href={URLS.instagram()}
                target="_blank"
                className="flex size-6 items-center justify-center rounded-full bg-white lg:size-8"
                rel="noreferrer"
              >
                <InstagramIcon className="size-4 fill-[#252525] lg:size-5" />
              </a>
              <a href={URLS.facebook()} target="_blank" rel="noreferrer">
                <FacebookIcon className="size-6 fill-white lg:size-8" />
              </a>
              <a href={URLS.linkedin()} target="_blank" rel="noreferrer">
                <LinkedinIcon className="size-6 fill-white lg:size-8" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-x-8 gap-y-2 text-xs text-white/50 md:mt-32 lg:flex-row lg:items-center lg:justify-between">
          <p>{`© ${CURRENT_YEAR} RK Abogados · Todos los derechos reservados`}</p>

          <button
            onClick={openSettings}
            className="cursor-pointer text-left text-white/50 transition-colors hover:text-white lg:text-center"
            type="button"
          >
            Configurar cookies
          </button>
        </div>
      </div>
    </footer>
  );
};
