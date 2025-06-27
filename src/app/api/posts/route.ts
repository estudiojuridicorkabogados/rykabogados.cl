import { NextResponse } from "next/server";

import { getContentfulClient } from "@/utils/contentful-client";
import { ApiPost } from "@/types/global";

export const revalidate = 0;

export async function GET() {
  try {
    const client = getContentfulClient();

    const result = await client.getEntries({
      content_type: "blogPost",
      include: 2,
      select: ["fields.slug", "sys.updatedAt"],
    });

    const posts: ApiPost[] = result?.items.map((post) => ({
      lastModified: post.sys.updatedAt,
      slug: post.fields.slug as unknown as string,
    }));

    return NextResponse.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch posts",
    });
  }
}
