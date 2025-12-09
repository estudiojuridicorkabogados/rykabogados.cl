"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

// import { useCookieConsent } from "../CookieConsent/useCookieConsent";

// const GOOGLE_ADS_TAG = "AW-11083927345";
// const GA_MEASUREMENT_ID = "G-HE87DHS09F";
const GOOGLE_TAG_MANAGER_ID = "GTM-PC49T6MC";

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

  // console.log("hasAnalyticsConsent", hasAnalyticsConsent);

  return (
    <>
      {/* Google Analytics */}
      {/* <Script
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
      /> */}

      {/* Google Tag Manager */}
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

      <Analytics />
      <SpeedInsights />
    </>
  );
}
