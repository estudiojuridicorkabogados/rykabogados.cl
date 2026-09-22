"use client";

import { useEffect } from "react";

import {
  CAMPAIGN_PARAMS,
  FIRST_TOUCH_PREFIX,
  readCampaignCookie,
  writeAttributionCookie,
} from "@/lib/utils/campaignParams";

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

      let isCampaignVisit = false;

      for (const param of CAMPAIGN_PARAMS) {
        const value = search.get(param);
        if (!value) continue;

        isCampaignVisit = true;

        // Last touch: overwritten every time, because the click happening now
        // is the one Google Ads should attribute this visit to.
        writeAttributionCookie(param, value);

        // First touch: written once and then left alone for ninety days. This
        // is what phase 5's funnels read, and what keeps the credit with the
        // campaign that actually found this person rather than the one they
        // happened to click on their way back.
        const firstTouchKey = `${FIRST_TOUCH_PREFIX}${param}`;
        if (!readCampaignCookie(firstTouchKey)) {
          writeAttributionCookie(firstTouchKey, value);
        }
      }

      // The landing page and referrer of the first campaign visit, recorded
      // alongside so a first-touch row can say where it came in.
      if (isCampaignVisit && !readCampaignCookie(`${FIRST_TOUCH_PREFIX}ts`)) {
        writeAttributionCookie(
          `${FIRST_TOUCH_PREFIX}landing`,
          window.location.pathname
        );
        writeAttributionCookie(
          `${FIRST_TOUCH_PREFIX}referrer`,
          document.referrer || "direct"
        );
        writeAttributionCookie(
          `${FIRST_TOUCH_PREFIX}ts`,
          new Date().toISOString()
        );
      }
    } catch {
      // Storage disabled or blocked — tracking is best-effort, never fatal.
    }
  }, []);

  return null;
};
