"use client";

import { useEffect } from "react";

import {
  CAMPAIGN_PARAMS,
  FIRST_TOUCH_PREFIX,
  readCampaignCookie,
  writeAttributionCookie,
} from "@/lib/utils/campaignParams";

import { useCookieConsent } from "../CookieConsent/useCookieConsent";

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
 * Since phase 3 these are written only with advertising consent. They are
 * first-party but they are marketing cookies by any honest reading — ninety
 * days, cross-visit, existing solely to attribute a conversation to a
 * campaign — and Google's Consent Mode does not reach them, so nothing else
 * would have.
 *
 * Which creates the problem this component now solves. The visitor has not
 * answered the banner when they land, and by the time they press accept the
 * router has usually stripped the campaign parameters from the URL. Reading
 * late would therefore lose the campaign for everyone who accepts, which is
 * most of them. So the landing URL is read at hydration into memory — memory
 * is not storage on the visitor's device, so holding it pending an answer
 * costs them nothing — and flushed to cookies if and when consent arrives.
 *
 * The buffer survives client-side navigation, because it is a module variable
 * and the site never reloads. It does not survive a hard reload, and that is
 * accepted: a visitor who lands, reloads, and only then accepts loses the
 * campaign.
 */

interface LandingSnapshot {
  params: Array<[string, string]>;
  landing: string;
  referrer: string;
  /** When they arrived — not when they later pressed accept. */
  ts: string;
}

/** What the landing page carried, held until the visitor answers. */
let pending: LandingSnapshot | null = null;

function captureLanding(): LandingSnapshot {
  const search = new URLSearchParams(window.location.search);
  const params: Array<[string, string]> = [];

  for (const param of CAMPAIGN_PARAMS) {
    const value = search.get(param);
    if (value) params.push([param, value]);
  }

  return {
    params,
    landing: window.location.pathname,
    referrer: document.referrer || "direct",
    ts: new Date().toISOString(),
  };
}

function flush(snapshot: LandingSnapshot): void {
  for (const [param, value] of snapshot.params) {
    // Last touch: overwritten every time, because the click happening now
    // is the one Google Ads should attribute this visit to.
    writeAttributionCookie(param, value);

    // First touch: written once and then left alone for ninety days. This
    // is what the Google Sheet row logs, and what keeps the credit with
    // the campaign that actually found this person rather than the one
    // they happened to click on their way back.
    const firstTouchKey = `${FIRST_TOUCH_PREFIX}${param}`;
    if (!readCampaignCookie(firstTouchKey)) {
      writeAttributionCookie(firstTouchKey, value);
    }
  }

  // The landing page and referrer of the very first visit, campaign or
  // not. It used to be recorded only when a campaign marker was present,
  // which left an organic or referral first visit with no first touch at
  // all — and a paid click a week later then claimed to be the first. The
  // referrer is what lets the Sheet tell "google / organic" from "direct".
  if (!readCampaignCookie(`${FIRST_TOUCH_PREFIX}ts`)) {
    writeAttributionCookie(`${FIRST_TOUCH_PREFIX}landing`, snapshot.landing);
    writeAttributionCookie(`${FIRST_TOUCH_PREFIX}referrer`, snapshot.referrer);
    writeAttributionCookie(`${FIRST_TOUCH_PREFIX}ts`, snapshot.ts);
  }
}

export const TrackingParamsCapture = () => {
  // Subscribing to the context rather than reading the cookie once, so a
  // visitor who accepts mid-visit gets the campaign they arrived on.
  const { hasAdvertisingConsent: consented } = useCookieConsent();

  useEffect(() => {
    try {
      pending = pending ?? captureLanding();

      if (consented) {
        flush(pending);
      }
    } catch {
      // Storage disabled or blocked — tracking is best-effort, never fatal.
    }
  }, [consented]);

  return null;
};
