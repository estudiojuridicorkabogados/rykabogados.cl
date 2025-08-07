import { Inter } from "next/font/google";

export const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const georgia = {
  style: {
    fontFamily: 'Georgia, "Times New Roman", Times, serif',
  },
  variable: "--font-georgia",
};
