import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Document } from "@contentful/rich-text-types";

import { URLS } from "@/lib/utils/constants";
import { timeToRead } from "@/lib/utils/content";
import { extractImageDataFromContentfulAsset } from "@/lib/utils/images";
import {
  Asset as AssetGraphQL,
  Post as PostGraphQL,
} from "@/types/generated/graphql";
import { Post, RichTextAsset } from "@/types/global";

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

  const plainTextString = graphQLPost.content
    ? documentToPlainTextString(graphQLPost.content.json)
    : "";

  console.log("graphQLPost", graphQLPost)

  return {
    ...graphQLPost,
    content: {
      json: graphQLPost.content?.json,
      assets: graphQLPost.content?.links.assets.block
        .filter((asset) => !!asset)
        .map(parseLinkToAsset),
    },
    author: {
      name: graphQLPost.author?.nombreYApellido,
      photo: graphQLPost.author?.photo ? {
        url: graphQLPost.author.photo.url,
        title: graphQLPost.author.photo.title,
        description: graphQLPost.author.photo.description,
        details: {
          height: graphQLPost.author.photo.height,
          width: graphQLPost.author.photo.width,
        },
      } : null,
    },
    timeToRead: timeToRead(plainTextString),
    href: graphQLPost.slug ? URLS.blogPost(graphQLPost.slug) : undefined,
    mainImage,
  };
}
