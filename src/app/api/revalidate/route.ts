import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { env } from "@/lib/env";
import { URLS } from "@/lib/utils/constants";

interface ContentfulWebhookPayload {
  sys?: {
    contentType?: {
      sys?: {
        id?: string;
      };
    };
  };
  // Webhook payloads key field values by locale, e.g. { slug: { "en-US": "my-post" } }
  fields?: {
    slug?: Record<string, string>;
  };
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");

  if (secret !== env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let payload: ContentfulWebhookPayload = {};
  try {
    payload = await request.json();
  } catch {
    // No/invalid body: still revalidate the list pages below
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  const slug = Object.values(payload.fields?.slug ?? {})[0];
  if (slug) {
    revalidatePath(URLS.blogPost(slug));
  }

  return NextResponse.json({
    revalidated: true,
    slug: slug ?? null,
    now: new Date().toISOString(),
  });
}
