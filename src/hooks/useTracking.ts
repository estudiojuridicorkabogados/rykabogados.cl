"use client";

import { useCallback, useMemo } from "react";

import {
  buildWhatsAppUrl,
  fireConversion,
  getSessionCode,
  logToSheet,
  LogToSheetParams,
} from "@/lib/utils/tracking";

interface UseTrackingReturn {
  whatsappUrl: string;
  shortCode: string;
  logToSheet: (params: Omit<LogToSheetParams, "gclid" | "shortCode">) => void;
  fireConversion: (sendTo?: string) => void;
}

export function useTracking(): UseTrackingReturn {
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

  // Memoized buildWhatsAppUrl wrapper that includes shortCode and gclid
  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl({ gclid, shortCode }),
    [gclid, shortCode]
  );

  return {
    whatsappUrl,
    shortCode,
    logToSheet: logToSheetWrapper,
    fireConversion,
  };
}
