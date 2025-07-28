"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { URLS } from "@/utils/constants";

export const Navbar = () => {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 650) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
     <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900"
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="border-l-4 border-[#AE8D54] pl-4">
              <div className="text-white">
                <div className="text-xl font-bold tracking-wide">
                  Retamales
                </div>
                <div className="text-xl font-bold tracking-wide">Kowalski</div>
                <div className="text-sm font-light tracking-widest opacity-90">
                  ABOGADOS
                </div>
              </div>
            </div>
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
    </motion.header>
  );
};
