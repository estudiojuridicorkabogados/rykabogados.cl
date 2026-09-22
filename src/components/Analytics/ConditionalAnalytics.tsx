"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { ContactClickTracker } from "./ContactClickTracker";
import { DeferredGoogleTagManager } from "./DeferredGoogleTagManager";
import { PageViewTracker } from "./PageViewTracker";
import { ScrollDepthTracker } from "./ScrollDepthTracker";
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
