"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { URLS } from "@/lib/utils/constants";

import { Button } from "../ui/Button";

import { useCookieConsent } from "./useCookieConsent";

const EXIT_MS = 300;

export const CookieBanner = () => {
  const { showBanner, acceptAll, openSettings } = useCookieConsent();
  // Keep the banner mounted through its exit animation, which is what
  // AnimatePresence used to do.
  // Derive the mount flag during render (a pattern React supports) rather
  // than from an effect, and only clear it asynchronously once the exit
  // animation has run. This is what AnimatePresence used to handle.
  const [prevShow, setPrevShow] = useState(showBanner);
  const [mounted, setMounted] = useState(showBanner);

  if (prevShow !== showBanner) {
    setPrevShow(showBanner);
    if (showBanner) setMounted(true);
  }

  const closing = mounted && !showBanner;

  useEffect(() => {
    if (showBanner || !mounted) return;
    const timer = setTimeout(() => setMounted(false), EXIT_MS);
    return () => clearTimeout(timer);
  }, [showBanner, mounted]);

  if (!mounted) return null;

  return (
    // Not role="dialog": it is non-modal, traps no focus and the page stays
    // usable behind it.
    //
    // Two buttons on purpose. Rejecting lives one click away, inside
    // "Personalizar" — see the note in CookieSettingsModal for why that is a
    // defensible position in Chile today and when it stops being one.
    <div
      data-closing={closing}
      role="region"
      aria-labelledby="cookie-banner-title"
      className="cookie-banner fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white shadow-lg"
    >
      <div className="container mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Content */}
          <div className="flex-1">
            <h3
              id="cookie-banner-title"
              className="mb-2 !font-sans text-lg font-semibold text-gray-900"
            >
              Usamos cookies
            </h3>
            <p className="text-sm text-gray-600">
              Utilizamos cookies propias y de terceros para mejorar tu
              experiencia de navegación y analizar el uso de nuestro sitio web.
              Puedes aceptar todas las cookies, rechazarlas o personalizarlas.{" "}
              <Link
                href={URLS.cookiePolicy()}
                className="group hover:text-accent-dark items-center gap-2 text-sm font-bold text-black underline transition-colors duration-200"
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
              className="group w-full lg:w-fit"
              type="button"
              onClick={openSettings}
            >
              Personalizar
            </Button>

            <Button
              animateOnClick
              variant="dark"
              className="group w-full lg:w-fit"
              type="button"
              onClick={acceptAll}
            >
              Aceptar todas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
