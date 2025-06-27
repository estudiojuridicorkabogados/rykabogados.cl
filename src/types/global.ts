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

export interface Post {
  title?: Maybe<string>;
  //   metaTitle?: Maybe<string>;
  //   metaDescription?: Maybe<string>;
  slug?: Maybe<string>;
  mainImage?: Image;
  category?: Maybe<string>;
  richtext: RichText;
  date?: Date;
  href?: Maybe<string>;
  timeToRead?: number;
}

export type ShortPost = Pick<Post, "slug" | "title" | "href" | "date">;
