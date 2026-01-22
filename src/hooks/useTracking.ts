"use client";

import { useEffect, useMemo, useState } from "react";

import {
  buildWhatsAppUrl,
  fireConversion,
  getGclid,
  getSessionCode,
  logToSheet,
} from "@/lib/utils/tracking";

interface UseTrackingReturn {
  shortCode: string;
  gclid: string;
  logToSheet: (params: {
    landing: string;
    channel: string;
    phone?: string;
    email?: string;
  }) => void;
  buildWhatsAppUrl: (params: { phone: string; baseText: string }) => string;
  fireConversion: (sendTo?: string) => void;
}

export function useTracking(): UseTrackingReturn {
  const [shortCode, setShortCode] = useState<string>("");
  const [gclid, setGclid] = useState<string>("");

  // Initialize on mount
  useEffect(() => {
    setShortCode(getSessionCode());
    setGclid(getGclid());
  }, []);

  // Memoized logToSheet wrapper that includes shortCode and gclid
  const logToSheetWrapper = useMemo(
    () =>
      (params: {
        landing: string;
        channel: string;
        phone?: string;
        email?: string;
      }) => {
        logToSheet({
          ...params,
          gclid,
          shortCode,
        });
      },
    [gclid, shortCode]
  );

  // Memoized buildWhatsAppUrl wrapper that includes shortCode and gclid
  const buildWhatsAppUrlWrapper = useMemo(
    () => (params: { phone: string; baseText: string }) => {
      return buildWhatsAppUrl({
        ...params,
        shortCode,
        gclid,
      });
    },
    [gclid, shortCode]
  );

  return {
    shortCode,
    gclid,
    logToSheet: logToSheetWrapper,
    buildWhatsAppUrl: buildWhatsAppUrlWrapper,
    fireConversion,
  };
}
