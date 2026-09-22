"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ContactClickTracker } from "./ContactClickTracker";
import { DeferredGoogleTagManager } from "./DeferredGoogleTagManager";
import { PageViewTracker } from "./PageViewTracker";
import { ScrollDepthTracker } from "./ScrollDepthTracker";
import { TrackingParamsCapture } from "./TrackingParamsCapture";

/**
 * Was ConditionalAnalytics, and conditioned nothing: the consent gate it was
 * named for had been commented out, and phase 3 removes it rather than
 * restoring it.
 *
 * Under Consent Mode the container has to load for everyone. A gated container
 * would only arrive after the visitor accepted, by which point the router has
 * usually stripped `gclid` from document.location — and the Google tag derives
 * `_gcl_aw` by reading it there at init, so gating would reintroduce the
 * attribution loss commit 26d8283 fixed. It would also send no cookieless
 * pings, have nothing present to receive a later consent update, and never
 * apply url_passthrough. What gets restricted is the tags inside it.
 *
 * Vercel's Analytics and Speed Insights stay outside the banner on purpose:
 * they set no cookie and store nothing on the device, so the storage rule the
 * banner implements does not reach them. Gating by not-rendering — which is
 * what the old early returns did — would have swept them in.
 */
export function SiteAnalytics() {
  return (
    <>
      <TrackingParamsCapture />

      <PageViewTracker />
      <ScrollDepthTracker />
      <ContactClickTracker />

      <DeferredGoogleTagManager />

      <Analytics />
      {/* Sample only 40% of page views to reduce edge function invocations */}
      <SpeedInsights sampleRate={0.4} />
    </>
  );
}
