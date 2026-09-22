"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Menu as MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/lib/utils/constants";

import logoBlack from "../../../public/images/logos/logo-black.png";
import { AgendaUnaAsesoria } from "../AgendaUnaAsesoria/AgendaUnaAsesoria";

import { HoverPopover } from "./HoverPopover";

const MOBILE_LINKS = [
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
    href: URLS.nosotros(),
    label: "Nosotros",
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

const SERVICIOS_LINKS = [
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
];

export const Navbar = () => {
  return (
    <Disclosure
      as="nav"
      className="relative z-50 h-[80px] bg-white py-2 lg:h-[100px]"
    >
      <div className="container mx-auto flex h-full items-center justify-between px-6 lg:px-0">
        <Link href="/" className="flex h-full items-center">
          <span className="block w-[160px] shrink-0 lg:w-[220px]">
            <Image
              src={logoBlack}
              alt="RK Abogados Logo"
              width={220}
              height={45}
              style={{ width: "100%", height: "auto" }}
            />
          </span>
        </Link>

        <div className="hidden items-center space-x-8 font-light text-white lg:flex">
          <HoverPopover label="Servicios" links={SERVICIOS_LINKS} />

          <Link
            href={URLS.nosotros()}
            className="hover:text-accent-dark text-black transition-colors"
          >
            Nosotros
          </Link>

          <Link
            href={URLS.blog()}
            className="hover:text-accent-dark text-black transition-colors"
          >
            Blog
          </Link>

          <Link
            href={URLS.contacts()}
            className="hover:text-accent-dark text-black transition-colors"
          >
            Contacto
          </Link>
        </div>

        <div className="hidden h-full lg:flex lg:w-[220px] lg:items-center lg:justify-center">
          <AgendaUnaAsesoria location="navbar" variant="white" />
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <DisclosureButton className="group focus:outline-accent-dark relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 outline-none hover:bg-white/5 hover:text-white focus:outline-2">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Abrir el menú principal</span>
            <MenuIcon
              aria-hidden="true"
              className="block size-6 group-data-open:hidden"
            />
            <XIcon
              aria-hidden="true"
              className="hidden size-6 group-data-open:block"
            />
          </DisclosureButton>
        </div>
      </div>

      <DisclosurePanel
        transition
        className="origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0"
      >
        {({ close }) => (
          <div className="space-y-1 bg-white px-6 pt-6 pb-6">
            {MOBILE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => close()}
                className="block w-full border-b border-black/10 py-4 text-sm text-black first:pt-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <p className="pb-2 text-xs font-semibold tracking-wider text-black/40 uppercase">
                Agenda una asesoría
              </p>
              <Link
                href={URLS.speakWithUsTrabajadores()}
                onClick={() => close()}
                className="block w-full border-b border-black/10 py-3 text-sm text-black"
              >
                Trabajadores
              </Link>
              <Link
                href={URLS.speakWithUsEmpresas()}
                onClick={() => close()}
                className="block w-full py-3 text-sm text-black"
              >
                Empresas
              </Link>
            </div>
          </div>
        )}
      </DisclosurePanel>
    </Disclosure>
  );
};
