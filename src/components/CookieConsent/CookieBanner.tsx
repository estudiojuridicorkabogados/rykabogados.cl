"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { URLS } from "@/lib/utils/constants";

import { Button } from "../ui/Button";

import { useCookieConsent } from "./useCookieConsent";

const EXIT_MS = 300;

export const CookieBanner = () => {
  const { showBanner, acceptAll, rejectAll, openSettings } = useCookieConsent();
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
    // Three buttons since 24 September 2026. Rejecting used to live one click
    // away, inside "Personalizar", which nothing in force in Chile forbids —
    // the first-layer reject is EU supervisory doctrine. The firm asked for it
    // on the first layer anyway (decision 3 of docs/client-brief.md): they
    // align their own policy with the European rules, so accepting in one
    // click while rejecting took two was not a trade they wanted to defend.
    //
    // Reject and accept carry the same variant, so neither is the easier
    // button. That is the part to leave alone: same component, same size, same
    // fill, so their relative prominence is not a matter of opinion. The
    // EDPB's 2023 cookie-banner taskforce went after banners that styled
    // rejection to be markedly less visible than acceptance, and making this
    // one white would walk straight back into the asymmetry the firm asked us
    // to remove.
    //
    // Order is free, though — no guidance speaks to it — and "Personalizar"
    // leads rather than sits in the middle. Reject led the row until later on
    // 24 September 2026, which read as the banner's headline action; moving it
    // costs nothing and fixes that. Accept keeps the rightmost slot, which is
    // where a right-aligned group's primary action conventionally sits.
    //
    // The modal's footer keeps its own order — reject, save, accept — because
    // its middle button is a third decision rather than a way out to another
    // surface. The two rows are not meant to be identical.
    <section
      data-closing={closing}
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
              {/* TODO(copy): the firm has asked to rewrite this paragraph —
                  they consider it not entirely accurate. This wording is ours
                  and stands only until theirs arrives; the sentence about the
                  buttons was corrected on 24 September 2026 to match the three
                  that are now here. See docs/client-brief.md, decision 5. */}
              Utilizamos cookies propias y de terceros para mejorar tu
              experiencia de navegación y analizar el uso de nuestro sitio web.
              Puedes aceptarlas todas, rechazarlas todas o elegir cuáles
              permitir desde «Personalizar».{" "}
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
            {/* The quiet way out, and first in the DOM so it is the top
                button when the row stacks on a phone. */}
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
              onClick={rejectAll}
            >
              Rechazar todas
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
    </section>
  );
};
