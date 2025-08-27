import { Document } from "@contentful/rich-text-types";

import { Maybe } from "./generated/graphql";

export interface Image {
  url?: Maybe<string>;
  title?: Maybe<string>;
  description?: Maybe<string>;
  details: {
    height?: Maybe<number>;
    width?: Maybe<number>;
  };
}

export interface RichTextAsset {
  id: string;
  title?: Maybe<string>;
  description?: Maybe<string>;
  contentType?: Maybe<string>;
  width?: Maybe<number>;
  height?: Maybe<number>;
  url?: Maybe<string>;
}

export interface RichText {
  json?: Document;
  assets?: Array<RichTextAsset | undefined>;
}

export interface Author {
  name?: Maybe<string>;
  photo: Maybe<Image>;
}

export interface Post {
  title?: Maybe<string>;
  metaTitle?: Maybe<string>;
  metaDescription?: Maybe<string>;
  slug?: Maybe<string>;
  excerpt?: Maybe<string>;
  author?: Maybe<Author>;
  mainImage?: Image;
  content: RichText;
  date?: string;
  href?: Maybe<string>;
  timeToRead?: number;
}

export type ShortPost = Pick<
  Post,
  "slug" | "title" | "excerpt" | "href" | "mainImage" | "date" | "author"
>;

export interface ApiPost {
  lastModified: string;
  slug: string;
}
