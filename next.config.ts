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
    ];
  },
};

export default nextConfig;
