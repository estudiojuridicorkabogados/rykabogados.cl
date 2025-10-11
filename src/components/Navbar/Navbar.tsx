import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  BriefcaseBusiness,
  HardHat,
  Landmark,
  Menu as MenuIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/lib/utils/constants";

import { ClientLink } from "./ClientLink";
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
  {
    href: URLS.speakWithUs(),
    label: "Reserva una Llamada",
  },
];

const SERVICIOS_LINKS = [
  {
    href: URLS.asesoriaTrabajadores(),
    label: "Asesoría Trabajadores",
    icon: <HardHat className="size-4 stroke-primary" />,
  },
  {
    href: URLS.asesoriaEmpresas(),
    label: "Asesoría Empresas",
    icon: <Landmark className="size-4 stroke-primary" />,
  },
  {
    href: URLS.otrasAreas(),
    label: "Otras Áreas",
    icon: <BriefcaseBusiness className="size-4 stroke-primary" />,
  },
];

export const Navbar = () => {
  return (
    <Disclosure
      as="nav"
      className="relative z-50 bg-white h-[80px] lg:h-[100px] py-2"
    >
      <div className="container mx-auto px-6 lg:px-0 flex items-center justify-between h-full">
        <Link
          href="/"
          className="relative flex items-center h-full w-[160px] lg:w-[220px]"
        >
          <Image
            src="/images/logos/logo-black.png"
            alt="RK Abogados Logo"
            fill
            sizes="(max-width: 1024px) 180px, 240px"
            className="object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center space-x-8 text-white font-light">
          <HoverPopover label="Servicios" links={SERVICIOS_LINKS} />

          <Link
            href={URLS.nosotros()}
            className="text-black hover:text-accent-dark transition-colors"
          >
            Nosotros
          </Link>

          <Link
            href={URLS.blog()}
            className="text-black hover:text-accent-dark transition-colors"
          >
            Blog
          </Link>

          <Link
            href={URLS.contacts()}
            className="text-black hover:text-accent-dark transition-colors"
          >
            Contacto
          </Link>
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-center h-full lg:w-[220px]">
          <ClientLink />
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <DisclosureButton className="outline-none group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-accent-dark">
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
        <div className="bg-white space-y-1 px-6 pt-6 pb-6">
          {MOBILE_LINKS.map((link) => (
            <DisclosureButton
              key={link.href}
              as={Link}
              href={link.href}
              className="block py-4 text-sm text-black border-b border-black/10 first:pt-0 last:pb-0 last:border-none"
            >
              {link.label}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
