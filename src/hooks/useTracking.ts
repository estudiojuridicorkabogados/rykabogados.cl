"use client";

import { useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";

import {
  CLICK_ID_PARAMS,
  readCampaignCookie,
} from "@/lib/utils/campaignParams";
import {
  buildWhatsAppUrl,
  getSessionCode,
  logToSheet,
  LogToSheetParams,
} from "@/lib/utils/tracking";

const TRABAJADORES_MSG =
  "¡Hola! Estoy enfrentando una situación laboral y necesito orientación legal. Me gustaría recibir asesoría de su equipo, por favor.";
const EMPRESAS_MSG =
  "¡Hola! Soy parte de una empresa y estamos buscando asesoría legal. Me gustaría que nos ayudaran a evaluar la situación, por favor.";

interface UseTrackingReturn {
  whatsappUrl: string;
  shortCode: string;
  logToSheet: (params: Omit<LogToSheetParams, "gclid" | "shortCode">) => void;
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

  // Only generate a case code for visits that came from an ad click
  const shortCode = useMemo(() => (clickId ? getSessionCode() : ""), [clickId]);

  // Memoized logToSheet wrapper that includes shortCode and gclid
  const logToSheetWrapper = useCallback(
    (params: Omit<LogToSheetParams, "gclid" | "shortCode">) => {
      logToSheet({
        ...params,
        // Wire field stays `gclid` — the Apps Script behind the Sheet expects
        // that name, and a wbraid is still the ad click it is asking for.
        gclid: clickId,
        shortCode,
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
