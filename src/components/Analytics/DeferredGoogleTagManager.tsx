"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

import { hasCampaignParam } from "@/lib/utils/campaignParams";

const GOOGLE_TAG_MANAGER_ID = "GTM-PC49T6MC";

/**
 * GTM pulls ~506KB across gtm.js and two gtag containers (AW-11083927345 and
 * G-HE87DHS09F) and is by far the largest main-thread cost on every page —
 * 3.2s of Total Blocking Time on desktop in Lighthouse. None of it is needed
 * to render anything.
 *
 * It is safe to defer here for our own conversions specifically because
 * nothing on the site calls `gtag` directly: they go through
 * `window.dataLayer.push()` (src/lib/utils/analytics.ts), and pushes made
 * before GTM arrives sit in the array and are replayed when it initialises.
 *
 * Google's own attribution is a different matter, and deferring did break it.
 * The Google tag derives the `_gcl_aw` cookie by reading `gclid` off
 * `document.location` at the moment it initialises — not from the cookie we
 * write. Defer it past a client-side navigation and it reads a URL the router
 * has already stripped the parameter from, so `_gcl_aw` is never written and
 * the conversion reaches Ads with no click to attribute it to. Measured
 * against a production build: a visitor landing on `/?gclid=...` who clicks
 * through before GTM loads lost `_gcl_aw` on every run, while the same visit
 * without the navigation kept it. `next dev` hides this, because compiling a
 * route on demand is slow enough to let GTM win a race it loses in production.
 *
 * Hence the two paths below. Campaign visits load the tag at hydration, which
 * gets it in flight during the seconds a visitor spends reading before they
 * click anywhere. Everyone else keeps the deferral: they are the majority of
 * sessions, they carry nothing to attribute, and the Total Blocking Time saved
 * is the point of this component. Paid traffic is the wrong place to spend a
 * Lighthouse score.
 *
 * For those, loading starts on the first sign of a real visitor, with a timer
 * as a backstop so sessions that never interact are still counted.
 */
const INTERACTION_EVENTS = [
  "pointerdown",
  "keydown",
  "touchstart",
  "scroll",
  "mousemove",
] as const;

/** Backstop so a visitor who reads without interacting is still recorded. */
const FALLBACK_MS = 3500;

export const DeferredGoogleTagManager = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Must exist before GTM does, so conversions fired in the gap are queued
    // rather than dropped.
    window.dataLayer = window.dataLayer || [];

    // A campaign visit carries its click reference in the URL, and only for as
    // long as the visitor stays on this page — so it does not wait to be
    // earned by an interaction. Everyone else keeps the deferral.
    const isCampaignVisit = hasCampaignParam(window.location.search);

    let timer: ReturnType<typeof setTimeout>;

    const start = () => {
      cleanup();
      setShouldLoad(true);
    };

    function cleanup() {
      clearTimeout(timer);
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, start);
      }
    }

    if (!isCampaignVisit) {
      for (const event of INTERACTION_EVENTS) {
        window.addEventListener(event, start, { once: true, passive: true });
      }
    }

    // Scheduled rather than set outright: a campaign visit still leaves
    // hydration to finish before the 506KB lands on the main thread.
    timer = setTimeout(start, isCampaignVisit ? 0 : FALLBACK_MS);

    return cleanup;
  }, []);

  if (!shouldLoad) {
    return null;
  }

  /* oxlint-disable react/no-danger -- static GTM bootstrap snippet, no user input */
  return (
    <Script
      id="google-tag-manager"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GOOGLE_TAG_MANAGER_ID}');
          `,
      }}
    />
  );
  /* oxlint-enable react/no-danger */
};
