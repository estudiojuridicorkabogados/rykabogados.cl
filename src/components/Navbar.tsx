import { Menu, Phone, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { URLS } from "@/utils/constants";

export const Navbar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-gray-900">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="border-l-4 border-[#AE8D54] pl-4">
              <div className="text-white">
                <div className="text-2xl font-bold tracking-wide">RYO</div>
                <div className="text-2xl font-bold tracking-wide">
                  ASOCIADOS
                </div>
                <div className="text-sm font-light tracking-widest opacity-90">
                  ABOGADOS & CONSULTORES
                </div>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="hidden md:flex items-center text-white">
            <Phone className="h-4 w-4 mr-2" />
            <span className="text-lg font-semibold tracking-wide">
              +56 2 2345 6789
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-white">
            <Link
              href="#inicio"
              className="hover:text-[#AE8D54] transition-colors font-medium"
            >
              Nuestro Estudio
            </Link>
            <Link
              href="#areas"
              className="hover:text-[#AE8D54] transition-colors font-medium"
            >
              Áreas de Práctica
            </Link>
            <Link
              href="#servicios"
              className="hover:text-[#AE8D54] transition-colors font-medium"
            >
              Servicios
            </Link>
            <Link
              href={URLS.blog()}
              className="hover:text-[#AE8D54] transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              href="#contacto"
              className="hover:text-[#AE8D54] transition-colors font-medium"
            >
              Contacto
            </Link>
            <Button
              variant="default"
              size="icon"
              className="text-white hover:text-[#AE8D54]"
            >
              <Search className="h-5 w-5" />
            </Button>
          </nav>

          <Button
            variant="destructive"
            size="icon"
            className="lg:hidden text-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};
