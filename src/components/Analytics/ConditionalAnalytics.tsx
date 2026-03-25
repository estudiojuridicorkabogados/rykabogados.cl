"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

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

  /* eslint-disable @eslint-react/dom/no-dangerously-set-innerhtml */
  return (
    <>
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
      {/* Sample only 40% of page views to reduce edge function invocations */}
      <SpeedInsights sampleRate={0.4} />
    </>
  );
  /* eslint-enable @eslint-react/dom/no-dangerously-set-innerhtml */
}
