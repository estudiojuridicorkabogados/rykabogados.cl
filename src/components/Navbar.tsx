"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { URLS } from "@/utils/constants";
import Image from "next/image";

export const Navbar = () => {
  // const [hidden, setHidden] = useState(false);
  // const { scrollY } = useScroll();

  // useMotionValueEvent(scrollY, "change", (latest) => {
  //   const previous = scrollY.getPrevious() || 0;
  //   if (latest > previous && latest > 650) {
  //     setHidden(true);
  //   } else {
  //     // setHidden(false);
  //   }
  // });

  return (
    <header className="z-50 bg-white h-[100px] py-2">
      <div className="container mx-auto px-6 flex items-center justify-between h-full">
        <Link
          href="/"
          className="relative flex items-center h-full w-[243px]"
        >
          <Image
            src="/images/logo.png"
            alt="RyK Abogados Logo"
            layout="fill"
            // className="h-10 w-auto"
            objectFit="contain"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-white font-light">
          <Link
            href="#inicio"
            className="text-black hover:text-[#AE8D54] transition-colors"
          >
            Nuestro Estudio
          </Link>
          <Link
            href="#areas"
            className="text-black hover:text-[#AE8D54] transition-colors"
          >
            Áreas de Práctica
          </Link>
          <Link
            href="#servicios"
            className="text-black hover:text-[#AE8D54] transition-colors"
          >
            Servicios
          </Link>
          <Link
            href={URLS.blog()}
            className="text-black hover:text-[#AE8D54] transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#contacto"
            className="text-black hover:text-[#AE8D54] transition-colors"
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
    </header>
  );
};
