import type { MetadataRoute } from "next";

import { fetchPostRoutes } from "@/lib/contentful/post-routes";
import { absoluteUrl } from "@/lib/seo/site";

// Regenerate hourly so newly published posts appear without waiting for a
// rebuild. The Contentful webhook (/api/revalidate) also busts this path.
export const revalidate = 3600;

const BASE_PATHS = [
  "/",
  "/asesoria-trabajadores",
  "/otras-areas",
  "/blog",
  "/nosotros",
  "/contacto",
  "/habla-con-nosotros/trabajadores",
  "/habla-con-nosotros/empresas",
  "/faqs",
  "/politicas-de-privacidad",
  "/politica-cookies",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Degrade to the static routes rather than 500-ing the sitemap if Contentful
  // is unreachable at request time.
  const postRoutes = await fetchPostRoutes().catch((error: unknown) => {
    console.error("Error fetching post routes:", error);
    return [];
  });

  const newestPostDate = postRoutes[0]?.lastModified;

  const baseRoutes = BASE_PATHS.map((path) => ({
    url: absoluteUrl(path),
    // Only the blog index changes with new content; the rest are static pages.
    lastModified: path === "/blog" ? newestPostDate : undefined,
    changeFrequency:
      path === "/blog" ? ("daily" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : 0.8,
  }));

  return [
    ...baseRoutes,
    ...postRoutes.map(({ slug, lastModified }) => ({
      url: absoluteUrl(`/blog/${slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
