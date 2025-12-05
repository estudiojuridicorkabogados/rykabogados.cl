"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import { useCookieConsent } from "../CookieConsent/useCookieConsent";

const GOOGLE_ADS_TAG = "AW-11083927345";
const GA_MEASUREMENT_ID = "G-HE87DHS09F";

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

    
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            gtag('config', '${GOOGLE_ADS_TAG}');
          `,
        }}
      />
      
      <Analytics />
      <SpeedInsights />
    </>
  );
}
