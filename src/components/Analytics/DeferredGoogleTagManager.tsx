"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GOOGLE_TAG_MANAGER_ID = "GTM-PC49T6MC";

/**
 * GTM pulls ~506KB across gtm.js and two gtag containers (AW-11083927345 and
 * G-HE87DHS09F) and is by far the largest main-thread cost on every page —
 * 3.2s of Total Blocking Time on desktop in Lighthouse. None of it is needed
 * to render anything.
 *
 * It is safe to defer here specifically because nothing on the site calls
 * `gtag` directly: conversions go through `window.dataLayer.push()`
 * (src/lib/utils/analytics.ts), and pushes made before GTM arrives sit in the
 * array and are replayed when it initialises. `gclid` is captured by our own
 * code in src/lib/utils/tracking.ts, not by GTM, so ad attribution does not
 * depend on load order either.
 *
 * Loading starts on the first sign of a real visitor, with a timer as a
 * backstop so sessions that never interact are still counted.
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

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, start, { once: true, passive: true });
    }

    timer = setTimeout(start, FALLBACK_MS);

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
