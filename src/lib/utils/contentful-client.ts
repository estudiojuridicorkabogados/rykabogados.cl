import { type ContentfulClientApi, createClient } from "contentful";

import { env } from "@/lib/env";

interface Options {
  preview?: boolean;
}

export function getContentfulClient({
  preview = false,
}: Options = {}): ContentfulClientApi<undefined> {
  return createClient({
    host: `${preview ? "preview" : "cdn"}.contentful.com`,
    space: env.CONTENTFUL_SPACE_ID as string,
    accessToken: preview
      ? (env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string)
      : (env.CONTENTFUL_ACCESS_TOKEN as string),
  });
}
