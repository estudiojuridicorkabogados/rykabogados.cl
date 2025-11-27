import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";

import { getPostById } from "./utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const secret = searchParams.get("secret");
  const contentType = searchParams.get("content_type");
  const id = searchParams.get("id");

  if (secret !== env.CONTENTFUL_PREVIEW_SECRET || !id || !contentType) {
    return new Response("Invalid token", { status: 401 });
  }

  let href;
  try {
    switch (contentType) {
      case "post": {
        const post = await getPostById(id);
        href = post?.href;
        break;
      }
      default:
        return new Response("Invalid content_type", { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Invalid id", { status: 400 });
  }

  // If the slug doesn't exist prevent draft mode from being enabled
  if (!href) {
    return new Response(`Could not find ${contentType} with given id`, {
      status: 404,
    });
  }

  const draft = await draftMode();
  draft.enable();

  const cookieStore = await cookies();
  const cookie = cookieStore.get('__prerender_bypass');
  cookieStore.set('__prerender_bypass', cookie?.value || '', {
    name: '__prerender_bypass',
    value: cookie?.value,
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'none',
  });

  redirect(href);
}
