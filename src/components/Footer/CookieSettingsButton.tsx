"use client";

import { useCookieConsent } from "@/components/CookieConsent/useCookieConsent";

/** Small island so the rest of the footer can stay on the server. */
export const CookieSettingsButton = () => {
  const { openSettings } = useCookieConsent();

  return (
    <button
      onClick={openSettings}
      className="cursor-pointer text-left text-white/50 transition-colors hover:text-white lg:text-center"
      type="button"
    >
      Configurar cookies
    </button>
  );
};
