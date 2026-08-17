import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/seo/site";
import { getContentfulClient } from "@/lib/utils/contentful-client";

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

interface PostRoute {
  slug: string;
  lastModified: string;
}

async function fetchPostRoutes(): Promise<PostRoute[]> {
  try {
    const client = getContentfulClient();

    const result = await client.getEntries({
      content_type: "blogPost",
      limit: 1000,
      order: ["-sys.updatedAt"],
      select: ["fields.slug", "sys.updatedAt"],
    });

    return result.items
      .filter((post) => !!post.fields.slug)
      .map((post) => ({
        slug: post.fields.slug as unknown as string,
        lastModified: post.sys.updatedAt,
      }));
  } catch (error) {
    console.error("Error fetching post routes:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postRoutes = await fetchPostRoutes();

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
