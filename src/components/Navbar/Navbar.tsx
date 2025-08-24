import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HardHat, Landmark, Menu as MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/utils/constants";

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
    description: "Para aiutarte",
    icon: <HardHat className="size-4 stroke-white" />,
  },
  {
    href: URLS.asesoriaEmpresas(),
    label: "Asesoría Empresas",
    description: "Tiene empresas y pregunta",
    icon: <Landmark className="size-4 stroke-white" />,
  },
];

export const Navbar = () => {
  return (
    <Disclosure as="nav" className="relative z-50 bg-white h-[100px] py-2">
      <div className="container mx-auto px-6 flex items-center justify-between h-full">
        <Link href="/" className="relative flex items-center h-full w-[243px]">
          <Image
            src="/images/logo.png"
            alt="RyK Abogados Logo"
            fill
            className="object-contain"
          />
        </Link>

        <div className="hidden lg:flex items-center space-x-8 text-white font-light">
          <HoverPopover label="Servicios" links={SERVICIOS_LINKS} />

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

        <div className="hidden lg:flex">
          <ClientLink />
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-accent-dark">
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
        <div className="bg-white space-y-1 px-6 pt-2 pb-6">
          {MOBILE_LINKS.map((link) => (
            <DisclosureButton
              key={link.href}
              as={Link}
              href={link.href}
              className="block rounded-md py-2 text-base font-medium text-black"
            >
              {link.label}
            </DisclosureButton>
          ))}

          <ClientLink />
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
