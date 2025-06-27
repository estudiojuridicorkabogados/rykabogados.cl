/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
};

export type Post = Entry & {
  __typename?: 'Post';
  date?: Maybe<Scalars['DateTime']['output']>;
  mainImage?: Maybe<Asset>;
  richtext?: Maybe<PostRichtext>;
  slug?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type PostRichtext = {
  __typename?: 'PostRichtext';
  json: Scalars['JSON']['output'];
  links: PostRichtextLinks;
};

export type PostRichtextAssets = {
  __typename?: 'PostRichtextAssets';
  block: Array<Maybe<Asset>>;
};

export type PostRichtextEntries = {
  __typename?: 'PostRichtextEntries';
  block: Array<Maybe<Entry>>;
};

export type PostRichtextLinks = {
  __typename?: 'PostRichtextLinks';
  assets: PostRichtextAssets;
  entries: PostRichtextEntries;
};

export type Sys = {
  __typename?: 'Sys';
  id: Scalars['String']['output'];
};

export type Video = Entry & {
  __typename?: 'Video';
  contentfulMetadata: ContentfulMetadata;
  name?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  video?: Maybe<Scalars['JSON']['output']>;
};


export type VideoNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type VideoVideoArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
};
