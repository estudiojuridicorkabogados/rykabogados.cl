import { DM_Sans } from "next/font/google";

export const dmSans = DM_Sans({
  // 800 is declared nowhere in the codebase; each weight costs two @font-face
  // rules in the stylesheet and a face the browser has to consider.
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: true,
});
