import { gql } from "@apollo/client";

import { URLS } from "@/lib/utils/constants";
import { generatePostHref } from "@/lib/utils/hrefs";
import { extractImageDataFromContentfulAsset } from "@/lib/utils/images";
import { Post as PostGraphQL } from "@/types/generated/graphql";
import { ShortPost } from "@/types/global";

import { getApolloServerClient } from "../getApolloServerClient";

interface GetAllPostsParams {
  limit: number;
  isPreview?: boolean;
}

type ShortPostGraphQL = Pick<
  PostGraphQL,
  "slug" | "title" | "date" | "mainImage"
>;

interface AllPostsgQueryResposne {
  blogPostCollection: {
    items: ShortPostGraphQL[];
  };
}

interface GetAllPostsResponse {
  posts: ShortPost[];
}

const GET_ALL_POSTS_QUERY = gql`
  query ($preview: Boolean!, $limit: Int!) {
    blogPostCollection(order: date_DESC, preview: $preview, limit: $limit) {
      items {
        slug
        title
        date
        excerpt
        mainImage {
          title
          description
          width
          height
          url
        }
      }
    }
  }
`;

export async function getAllPosts({
  limit,
  isPreview = false,
}: GetAllPostsParams): Promise<GetAllPostsResponse> {
  try {
    const apolloClient = getApolloServerClient({ isPreview });

    const data = await apolloClient.query<AllPostsgQueryResposne>({
      query: GET_ALL_POSTS_QUERY,
      variables: { limit, preview: isPreview },
      context: {
        fetchOptions: {
          next: {
            revalidate: 3600,
          },
        },
      },
    });

    return {
      posts: data.data?.blogPostCollection.items
        .filter(({ slug }) => !!slug)
        .map((post) => ({
          ...post,
          href: URLS.blogPost(post.slug!),
          mainImage: post.mainImage
            ? extractImageDataFromContentfulAsset(post.mainImage)
            : undefined,
        })) || [],
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch post");
  }
}
