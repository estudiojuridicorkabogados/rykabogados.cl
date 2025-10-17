"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { useCookieConsent } from "../CookieConsent/useCookieConsent";

export function ConditionalAnalytics() {
  const { hasAnalyticsConsent, isLoading } = useCookieConsent();

  // Don't render anything while loading
  if (isLoading) {
    return null;
  }

  // Only render analytics if user has given consent
  if (!hasAnalyticsConsent) {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
