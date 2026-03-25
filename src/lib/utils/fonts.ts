import { DM_Sans } from "next/font/google";

export const dmSans = DM_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  preload: true,
});
