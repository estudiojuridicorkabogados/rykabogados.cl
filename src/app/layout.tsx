import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Toaster } from "sonner";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { env } from "@/lib/env";
import { dmSans } from "@/lib/utils/fonts";

import "./globals.css";

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

// const SupportChatbot = dynamic(
//   () =>
//     import("@/components/SupportChatbot/SupportChatbot").then(
//       (m) => m.SupportChatbot
//     ),
//   {
//     loading: () => <div className="sr-only">Loading chat…</div>,
//   }
// );

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL">
      <body className={`${dmSans.variable} antialiased bg-white`}>
        <Navbar />

        {/* <div className="bg-white">{children}</div> */}

        <div className="bg-white">
          <Toaster position="bottom-center" />

          {children}
        </div>

        <Footer />

        <Script
          async
          strategy="afterInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />

        {/* <SupportChatbot /> */}

        <Analytics />

        <SpeedInsights />
      </body>
    </html>
  );
}
