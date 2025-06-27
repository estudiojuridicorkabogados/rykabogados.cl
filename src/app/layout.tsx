import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import Script from "next/script";
import { poppins } from "@/utils/fonts";
import { Navbar } from "@/components/Navbar";

const ZAPIER_CHATBOT_ID = process.env.NEXT_PUBLIC_ZAPIER_CHATBOT_ID;

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
      <body className={`${poppins.variable}  antialiased bg-white`}>
        <Navbar />

        <div className="bg-white">{children}</div>

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
            __html: `<zapier-interfaces-chatbot-embed is-popup="true" chatbot-id="${ZAPIER_CHATBOT_ID}"></zapier-interfaces-chatbot-embed>`,
          }}
        />
      </body>
    </html>
  );
}
