"use client";

import { useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";

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

export function useTracking(): UseTrackingReturn {
  const pathname = usePathname();

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
   */
  const clickId = useMemo(() => {
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
  }, []);

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
        gclid: clickId,
        shortCode,
        // Read now, not at mount: the cookies are written by an effect after
        // hydration, and a form that mounted first would carry an empty
        // snapshot for the rest of the page.
        ...readFirstTouch(),
      });
    },
    [clickId, shortCode]
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

  // Memoized buildWhatsAppUrl wrapper that includes shortCode and gclid
  const whatsappUrl = useMemo(
    () =>
      buildWhatsAppUrl({ gclid: clickId, shortCode, message: whatsappMessage }),
    [clickId, shortCode, whatsappMessage]
  );

  return {
    whatsappUrl,
    shortCode,
    logToSheet: logToSheetWrapper,
  };
}
