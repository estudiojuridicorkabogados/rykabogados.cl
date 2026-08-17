import { getContentfulClient } from "@/lib/utils/contentful-client";
import { ApiPost } from "@/types/global";

// Contentful caps getEntries at 1000 items per request. The blog is well under
// that; the default limit of 100 is not, so it must be set explicitly.
const MAX_POSTS = 1000;

/**
 * Every published post's slug and last-modified date, straight from Contentful.
 *
 * Throws if Contentful is unreachable. Callers decide how to degrade: request-
 * time callers (sitemap, API route) should catch, but `generateStaticParams`
 * must not — swallowing the error there silently ships a build where every post
 * is an on-demand blocking render instead of a prerendered page.
 */
export async function fetchPostRoutes(): Promise<ApiPost[]> {
  const client = getContentfulClient();

  const result = await client.getEntries({
    content_type: "blogPost",
    limit: MAX_POSTS,
    order: ["-sys.updatedAt"],
    select: ["fields.slug", "sys.updatedAt"],
  });

  return result.items
    .filter((post) => !!post.fields.slug)
    .map((post) => ({
      slug: post.fields.slug as unknown as string,
      lastModified: post.sys.updatedAt,
    }));
}
