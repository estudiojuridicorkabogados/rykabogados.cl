import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  // },
  serverExternalPackages: ["pdf-parse"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
};

export default nextConfig;
