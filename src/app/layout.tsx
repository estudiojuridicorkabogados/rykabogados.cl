import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ZAPIER_CHATBOT_ID = "cmccfrrp7003wj4mb8rbq0jed";

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
    "Estudio jurídico especializado en derecho laboral con servicios en todo Chile. Ofrecemos excelencia, lealtad e integridad en cada caso.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <Footer />

        <Script
          async
          type="module"
          src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <div
          dangerouslySetInnerHTML={{
            __html: `<zapier-interfaces-chatbot-embed is-popup="true" chatbot-id="${ZAPIER_CHATBOT_ID}"></zapier-interfaces-chatbot-embed>`
          }}
        />
      </body>
    </html>
  );
}
