import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";

import { ConditionalAnalytics } from "@/components/Analytics/ConditionalAnalytics";
import { CookieBanner } from "@/components/CookieConsent/CookieBanner";
import { CookieConsentProvider } from "@/components/CookieConsent/CookieConsentProvider";
import { CookieSettingsModal } from "@/components/CookieConsent/CookieSettingsModal";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd/JsonLd";
import { Navbar } from "@/components/Navbar/Navbar";
import { env } from "@/lib/env";
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
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico", sizes: "any" },
  //     { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
  //     { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
  //   ],
  //   shortcut: "/favicon.ico",
  //   apple: "/favicon.ico",
  // },
};

const DynamicToaster = dynamic(() => import("sonner").then((m) => m.Toaster), {
  loading: () => <div className="sr-only">Loading toaster</div>,
});

const SupportChatbot = dynamic(
  () =>
    import("@/components/SupportChatbot/SupportChatbot").then(
      (m) => m.SupportChatbot
    ),
  {
    loading: () => <div className="sr-only">Loading chat…</div>,
  }
);

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

        <CookieConsentProvider>
          <Navbar />

          <div className="bg-white">
            <DynamicToaster position="bottom-center" />

            {children}
          </div>

          <Footer />

          <SupportChatbot />

          <CookieBanner />

          <CookieSettingsModal />

          <ConditionalAnalytics />
        </CookieConsentProvider>

        <Script
          async
          strategy="lazyOnload"
          src={`https://www.google.com/recaptcha/api.js?render=${env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />

        <JsonLd schema={[buildOrganizationJsonLd(), buildWebSiteJsonLd()]} />
      </body>
    </html>
  );
}
