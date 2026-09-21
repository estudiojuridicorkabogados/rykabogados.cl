"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { DeferredGoogleTagManager } from "./DeferredGoogleTagManager";
import { TrackingParamsCapture } from "./TrackingParamsCapture";

export function ConditionalAnalytics() {
  // const { hasAnalyticsConsent, isLoading } = useCookieConsent();

  // Don't render anything while loading
  // if (isLoading) {
  //   return null;
  // }

  // Only render analytics if user has given consent
  // if (!hasAnalyticsConsent) {
  //   return null;
  // }

  return (
    <>
      <TrackingParamsCapture />

      <DeferredGoogleTagManager />

      <Analytics />
      {/* Sample only 40% of page views to reduce edge function invocations */}
      <SpeedInsights sampleRate={0.4} />
    </>
  );
}
