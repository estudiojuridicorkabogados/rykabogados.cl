"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import { useCookieConsent } from "../CookieConsent/useCookieConsent";

const GA_MEASUREMENT_ID = "AW-11083927345";

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
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>

      {/* Vercel Analytics */}
      <Analytics />
      <SpeedInsights />
    </>
  );
}
