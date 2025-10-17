"use client";

import { AnimatePresence,motion } from "motion/react";
import Link from "next/link";

import { URLS } from "@/lib/utils/constants";

import { Button } from "../ui/Button";

import { useCookieConsent } from "./useCookieConsent";

export function CookieBanner() {
  const { showBanner, acceptAll, dismissBanner, openSettings } =
    useCookieConsent();

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Usamos cookies
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Utilizamos cookies propias y de terceros para mejorar tu
                  experiencia de navegación y analizar el uso de nuestro sitio
                  web. Puedes aceptar todas las cookies, rechazarlas o
                  personalizarlas.{" "}
                  <Link
                    href={URLS.cookiePolicy()}
                    className="text-primary-600 hover:text-primary-700 underline font-medium"
                  >
                    Más información
                  </Link>
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  animateOnClick
                  variant="default"
                  className="w-full lg:w-fit group"
                  type="button"
                  onClick={dismissBanner}
                >
                  Rechazar
                  {/* <LongArrowRight className="ml-2 stroke-white group-hover:stroke-primary group-hover:animate-wiggle" /> */}
                </Button>

                <Button
                  animateOnClick
                  variant="dark"
                  className="w-full lg:w-fit group"
                  type="button"
                  onClick={openSettings}
                >
                  Personalizar
                </Button>

                <Button
                  animateOnClick
                  variant="dark"
                  className="w-full lg:w-fit group"
                  type="button"
                  onClick={acceptAll}
                >
                  Aceptar todas
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
