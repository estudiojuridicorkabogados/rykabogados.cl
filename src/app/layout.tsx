import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { draftMode } from "next/headers";
import Script from "next/script";

import { ConditionalAnalytics } from "@/components/Analytics/ConditionalAnalytics";
import { CookieBanner } from "@/components/CookieConsent/CookieBanner";
import { CookieConsentProvider } from "@/components/CookieConsent/CookieConsentProvider";
import { CookieSettingsModal } from "@/components/CookieConsent/CookieSettingsModal";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { env } from "@/lib/env";
import { dmSans } from "@/lib/utils/fonts";

import "./globals.css";

// @TODO Improve metadata
export const metadata: Metadata = {
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
  description:
    "RK Abogados es un estudio jurídico que ofrece sus servicios a lo largo de todo Chile, conformado por un equipo de abogados especializados que resuelven...",
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
      <body className="antialiased bg-white">
        {/* Google Tag Manager (noscript) */}
        <CookieSettingsModal />

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PC49T6MC"
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

          <ConditionalAnalytics />
        </CookieConsentProvider>

        <Script
          async
          strategy="lazyOnload"
          src={`https://www.google.com/recaptcha/api.js?render=${env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
      </body>
    </html>
  );
}
