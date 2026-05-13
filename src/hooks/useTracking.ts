"use client";

import { useCallback, useMemo } from "react";
import { usePathname } from "next/navigation";

import {
  buildWhatsAppUrl,
  fireConversion,
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
  fireConversion: (sendTo?: string) => void;
}

export function useTracking(): UseTrackingReturn {
  const pathname = usePathname();

  const gclid = useMemo(() => {
    try {
      const urlGclid = new URLSearchParams(window.location.search).get("gclid");
      if (urlGclid) return urlGclid;

      const match = document.cookie.match(/(?:^|; )gclid=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : "";
    } catch {
      return "";
    }
  }, []);

  // Only generate a case code when a GCLID is present
  const shortCode = useMemo(() => (gclid ? getSessionCode() : ""), [gclid]);

  // Memoized logToSheet wrapper that includes shortCode and gclid
  const logToSheetWrapper = useCallback(
    (params: Omit<LogToSheetParams, "gclid" | "shortCode">) => {
      logToSheet({
        ...params,
        gclid,
        shortCode,
      });
    },
    [gclid, shortCode]
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
    () => buildWhatsAppUrl({ gclid, shortCode, message: whatsappMessage }),
    [gclid, shortCode, whatsappMessage]
  );

  return {
    whatsappUrl,
    shortCode,
    logToSheet: logToSheetWrapper,
    fireConversion,
  };
}
