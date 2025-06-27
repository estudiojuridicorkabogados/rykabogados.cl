import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";

import {
  Asset as AssetGraphQL,
  Post as PostGraphQL,
} from "@/types/generated/graphql";
import { Post, RichTextAsset } from "@/types/global";
import { timeToRead } from "@/utils/content";
import { extractImageDataFromContentfulAsset } from "@/utils/images";
import { URLS } from "@/utils/constants";

function parseLinkToAsset(
  graphQLLink: AssetGraphQL | undefined
): RichTextAsset | undefined {
  if (!graphQLLink) {
    return undefined;
  }

  return {
    title: graphQLLink.title,
    id: graphQLLink.sys.id,
    description: graphQLLink.description,
    contentType: graphQLLink.contentType,
    width: graphQLLink.width,
    height: graphQLLink.height,
    url: graphQLLink.url,
  };
}

export function parseGraphQLPost(graphQLPost: PostGraphQL): Post {
  const mainImage = graphQLPost.mainImage
    ? extractImageDataFromContentfulAsset(graphQLPost.mainImage as any) // Contentful new types are fucking awful, so I had to hack around a bit
    : undefined;

  const plainTextString = graphQLPost.richtext
    ? documentToPlainTextString(graphQLPost.richtext.json)
    : "";

  return {
    ...graphQLPost,
    richtext: {
      json: graphQLPost.richtext?.json,
      assets: graphQLPost.richtext?.links.assets.block
        .filter((asset) => !!asset)
        .map(parseLinkToAsset),
    },
    timeToRead: timeToRead(plainTextString),
    href: graphQLPost.slug ? URLS.blogPost(graphQLPost.slug) : undefined,
    mainImage,
  };
}
