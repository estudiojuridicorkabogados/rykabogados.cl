import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["lightningcss"],
  typedRoutes: true,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/habla-con-nosotros",
        destination: "/habla-con-nosotros/trabajadores",
        permanent: true,
      },
      {
        source: "/asesoria-empresas",
        destination: "/habla-con-nosotros/empresas",
        permanent: true,
      },
      {
        // Post was published on an auto-generated Contentful slug and renamed.
        source: "/blog/untitled-entry-2026-01-05-at-17-48-39",
        destination: "/blog/contrato-de-trabajo-en-chile",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
