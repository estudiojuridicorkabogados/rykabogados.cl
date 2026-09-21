import type { Metadata } from "next";

import { ConditionalAnalytics } from "@/components/Analytics/ConditionalAnalytics";
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
        {/* Google Tag Manager (noscript) */}

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PC49T6MC"
            title="Google Tag Manager"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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

            <ConditionalAnalytics />
          </CookieConsentProvider>
        </LazyMotionProvider>

        <JsonLd schema={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
      </body>
    </html>
  );
}
