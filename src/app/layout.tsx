import type { Metadata } from "next";

import { SiteAnalytics } from "@/components/Analytics/SiteAnalytics";
import { CookieBanner } from "@/components/CookieConsent/CookieBanner";
import { CookieConsentProvider } from "@/components/CookieConsent/CookieConsentProvider";
import { CookieSettingsModalLoader } from "@/components/CookieConsent/CookieSettingsModalLoader";
import { Footer } from "@/components/Footer/Footer";
import { FooterGate } from "@/components/Footer/FooterGate";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { LazyMotionProvider } from "@/components/Motion/LazyMotionProvider";
import { Navbar } from "@/components/Navbar/Navbar";
import { SupportChatbot } from "@/components/SupportChatbot/SupportChatbot";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/jsonLd";
import { DEFAULT_DESCRIPTION, SITE_URL } from "@/lib/seo/site";
import { CONSENT_BOOTSTRAP_SNIPPET } from "@/lib/utils/consent";
import { dmSans } from "@/lib/utils/fonts";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "RK Abogados | Excelencia, Lealtad e Integridad",
  keywords: [
    "abogados",
    "abogados en chile",
    "abogados en santiago",
    "abogados en chile santiago",
    "abogados chile",
    "abogados santiago",
    "abogados chile santiago",
    "abogados r&k",
  ],
  description: DEFAULT_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className={dmSans.variable}>
      <body className="bg-white antialiased">
        {/*
          Google Consent Mode defaults, before anything else on the page.

          GTM replays the dataLayer in order rather than reading it as state at
          init, and a consent type it has not been told about behaves as
          granted. PageViewTracker's effect pushes `rk_page_view` as soon as
          hydration runs, so a default sent from any component — including the
          one that injects GTM — can end up behind it and leave that page view
          to be processed unrestricted. Running here, before hydration exists,
          is what makes "the default is first" structural rather than a matter
          of component order.

          A plain inline script rather than next/script beforeInteractive:
          that one is hoisted by the framework and behaves differently between
          dev and a production build, while this is emitted verbatim and runs
          in document order. It replaces the GTM <noscript> iframe that used to
          sit here, which fired the container before any choice could exist and
          which Consent Mode could not reach.
        */}

        {/* oxlint-disable react/no-danger -- static snippet, no user input */}
        <script
          dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP_SNIPPET }}
        />
        {/* oxlint-enable react/no-danger */}

        <LazyMotionProvider>
          <CookieConsentProvider>
            <Navbar />

            <div className="bg-white">{children}</div>

            <FooterGate>
              <Footer />
            </FooterGate>

            <SupportChatbot />

            <CookieBanner />

            <CookieSettingsModalLoader />

            <SiteAnalytics />
          </CookieConsentProvider>
        </LazyMotionProvider>

        <JsonLd schema={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
      </body>
    </html>
  );
}
