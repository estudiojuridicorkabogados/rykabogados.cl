import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Menu as MenuIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { URLS } from "@/utils/constants";

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

        {/* Navigation */}
        <div className="hidden lg:flex items-center space-x-8 text-white font-light">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-black hover:text-[#AE8D54] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-accent-dark">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Abrir el menú principal</span>
            <MenuIcon aria-hidden="true" className="block size-6 group-data-open:hidden" />
            <XIcon
              aria-hidden="true"
              className="hidden size-6 group-data-open:block"
            />
          </DisclosureButton>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="bg-white space-y-1 px-2 pt-2 pb-3">
          {LINKS.map((link) => (
            <DisclosureButton
              as="div"
              key={link.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-white"
            >
              <Link
                href={link.href}
                className="text-black hover:text-[#AE8D54] transition-colors"
              >
                {link.label}
              </Link>
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
