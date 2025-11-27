import { URLS } from "@/lib/utils/constants";
import { getContentfulClient } from "@/lib/utils/contentful-client";

export async function getPostById(id: string) {
  const client = getContentfulClient({ preview: true });

  const result = await client.getEntries({
    "sys.id": id,
    content_type: "blogPost",
    include: 3,
    select: ["fields.slug"],
  });

  if (result?.items.length === 0) {
    throw new Error(`Could not find post with id ${id}`);
  }

  const post = result?.items[0];
  return {
    href: URLS.blogPost(post.fields.slug as unknown as string),
  };
}
