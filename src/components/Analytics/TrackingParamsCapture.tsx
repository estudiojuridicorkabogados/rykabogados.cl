"use client";

import { useEffect } from "react";

const PARAMS = ["gclid", "utm_source", "utm_medium", "utm_campaign"] as const;
const COOKIE_DAYS = 90;
const MAX_AGE = COOKIE_DAYS * 86400;

/**
 * Persists campaign parameters from the landing URL into cookies.
 *
 * This used to be src/proxy.ts, which ran as an edge function on every page
 * request — including the overwhelming majority carrying no parameter at all,
 * and including pages Vercel could otherwise have served straight from the CDN
 * cache. Nothing reads these cookies on the server: useTracking reads them
 * with document.cookie, so they were never httpOnly and never needed to be set
 * server-side. See docs/lcp-performance-plan.md.
 *
 * Runs after hydration, which is soon enough: useTracking prefers the value in
 * window.location.search on the landing page itself, and only falls back to
 * the cookie on later navigations, by which time this has written it.
 */
export const TrackingParamsCapture = () => {
  useEffect(() => {
    try {
      const search = new URLSearchParams(window.location.search);
      const secure = window.location.protocol === "https:" ? "; Secure" : "";

      for (const param of PARAMS) {
        const value = search.get(param);
        if (!value) continue;

        document.cookie = `${param}=${encodeURIComponent(
          value
        )}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
      }
    } catch {
      // Storage disabled or blocked — tracking is best-effort, never fatal.
    }
  }, []);

  return null;
};
