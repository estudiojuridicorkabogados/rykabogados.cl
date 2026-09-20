import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["lightningcss"],
  typedRoutes: true,
  reactCompiler: true,
  experimental: {
    // Run the React Compiler as native code inside Turbopack instead of through
    // Babel. Removes the need for babel-plugin-react-compiler.
    turbopackRustReactCompiler: true,
  },
  images: {
    // AVIF first: typically 25-35% smaller than WebP for these photographic
    // heroes, and the hero is the LCP element on every page.
    formats: ["image/avif", "image/webp"],
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
