"use client";

import { useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";

import { useCookieConsent } from "@/components/CookieConsent/useCookieConsent";
import { useSessionCode } from "@/hooks/useSessionCode";
import {
  CLICK_ID_PARAMS,
  readCampaignCookie,
  readFirstTouch,
} from "@/lib/utils/campaignParams";
import {
  buildWhatsAppUrl,
  logToSheet,
  LogToSheetParams,
} from "@/lib/utils/tracking";

const TRABAJADORES_MSG =
  "¡Hola! Estoy enfrentando una situación laboral y necesito orientación legal. Me gustaría recibir asesoría de su equipo, por favor.";
const EMPRESAS_MSG =
  "¡Hola! Soy parte de una empresa y estamos buscando asesoría legal. Me gustaría que nos ayudaran a evaluar la situación, por favor.";

type SheetRow = Pick<
  LogToSheetParams,
  "landing" | "channel" | "phone" | "email"
>;

interface UseTrackingReturn {
  whatsappUrl: string;
  shortCode: string;
  logToSheet: (params: SheetRow) => void;
}

/**
 * The Google Ads click reference for this visit, whichever name it arrived
 * under: `gclid` normally, `wbraid` or `gbraid` from iOS when tracking
 * permissions are restricted. Reading only `gclid` meant every iOS ad click
 * looked identical to organic traffic — no Caso code, nothing in the Sheet
 * to tie a WhatsApp conversation back to the campaign that paid for it.
 *
 * The whole URL is checked before any cookie: a visitor can land on a new ad
 * click while still carrying a 90-day-old cookie from a previous one, and
 * the click happening now is the one that should win.
 *
 * Read at the moment a row is written rather than memoised at mount, for the
 * same reason readFirstTouch is: the cookie is flushed by an effect when the
 * visitor accepts, and a hook that captured "" during the render that
 * flipped consent would have kept it for the rest of the page.
 */
function readClickId(): string {
  try {
    const search = new URLSearchParams(window.location.search);

    for (const param of CLICK_ID_PARAMS) {
      const fromUrl = search.get(param);
      if (fromUrl) return fromUrl;
    }

    for (const param of CLICK_ID_PARAMS) {
      const fromCookie = readCampaignCookie(param);
      if (fromCookie) return fromCookie;
    }

    return "";
  } catch {
    return "";
  }
}

export function useTracking(): UseTrackingReturn {
  const pathname = usePathname();

  // The click reference and the first touch are advertising data whether they
  // come from a cookie or straight off the landing URL. The cookies are only
  // *written* with consent since phase 3, but the ones written before it —
  // unconditionally, for every visitor of the last ninety days — are still
  // there, and the URL read never asked. So a visitor who never answered the
  // banner had their ad click and first campaign logged next to their phone
  // number. Without consent the row carries no campaign, as documented in
  // logToSheet.
  const { hasAdvertisingConsent } = useCookieConsent();

  /**
   * Every visitor gets a Caso code, not only the ones who arrived on an ad.
   * While it was conditional on a click reference, an organic or Meta visitor
   * who wrote on WhatsApp arrived with nothing to quote, so that conversation
   * could never be matched to the Sheet row it belongs to.
   */
  const shortCode = useSessionCode();

  // Memoized logToSheet wrapper that includes shortCode, gclid and first touch
  const logToSheetWrapper = useCallback(
    (params: SheetRow) => {
      logToSheet({
        ...params,
        // Wire field stays `gclid` — the Apps Script behind the Sheet expects
        // that name, and a wbraid is still the ad click it is asking for.
        gclid: hasAdvertisingConsent ? readClickId() : "",
        shortCode,
        // Read now, not at mount: the cookies are written by an effect after
        // hydration, and a form that mounted first would carry an empty
        // snapshot for the rest of the page.
        ...(hasAdvertisingConsent && readFirstTouch()),
      });
    },
    [hasAdvertisingConsent, shortCode]
  );

  const whatsappMessage = useMemo(() => {
    if (pathname.includes("trabajadores")) {
      return TRABAJADORES_MSG;
    }
    if (pathname.includes("empresas")) {
      return EMPRESAS_MSG;
    }
    return undefined;
  }, [pathname]);

  // Memoized buildWhatsAppUrl wrapper that includes the shortCode
  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl({ shortCode, message: whatsappMessage }),
    [shortCode, whatsappMessage]
  );

  return {
    whatsappUrl,
    shortCode,
    logToSheet: logToSheetWrapper,
  };
}
