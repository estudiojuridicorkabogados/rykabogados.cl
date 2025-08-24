import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Script from "next/script";
import { Toaster } from "sonner";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { dmSans } from "@/utils/fonts";

import "./globals.css";

// const ZAPIER_CHATBOT_ID = process.env.NEXT_PUBLIC_ZAPIER_CHATBOT_ID;

// @TODO Improve metadata
export const metadata: Metadata = {
  title: "RyK Abogados | Excelencia, Lealtad y Integridad",
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
    "RyK ABOGADOS es un estudio jurídico que ofrece sus servicios a lo largo de todo Chile, conformado por un equipo de abogados especializados que resuelven...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL">
      <body className={`${dmSans.variable} antialiased bg-white`}>
        <Navbar />

        <div className="bg-white">
          <Toaster position="bottom-center" />

          {children}
        </div>

        <Footer />

        <Script
          async
          strategy="afterInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />

        {/* <Script
          async
          type="module"
          src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <div
          dangerouslySetInnerHTML={{
            __html: `<zapier-interfaces-chatbot-embed is-popup="true" chatbot-id="${ZAPIER_CHATBOT_ID}"></zapier-interfaces-chatbot-embed>`,
          }}
        /> */}

        <Analytics />

        <SpeedInsights />
      </body>
    </html>
  );
}
