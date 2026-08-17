import { gql } from "@apollo/client";

import { Post as PostGraphQL } from "@/types/generated/graphql";
import { Post } from "@/types/global";

import { getApolloServerClient } from "../getApolloServerClient";
import { parseGraphQLPost } from "../parsers/posts";

interface GetPostParams {
  slug: string;
  isPreview?: boolean;
}

interface PostQueryResposne {
  blogPostCollection: {
    items: PostGraphQL[];
  };
}

const GET_POST_QUERY = gql`
  query ($slug: String!, $preview: Boolean!) {
    blogPostCollection(where: { slug: $slug }, preview: $preview, limit: 1) {
      items {
        title
        metaTitle
        metaDescription
        slug
        excerpt
        date
        content {
          json
          links {
            entries {
              block {
                sys {
                  id
                }
              }
            }
            assets {
              block {
                sys {
                  id
                }
                contentType
                title
                description
                width
                height
                url
              }
            }
          }
        }
        mainImage {
          title
          description
          width
          height
          url
        }
        author {
          nombreYApellido
          photo(preview: $preview) {
            title
            description
            width
            height
            url
          }
        }
      }
    }
  }
`;

/**
 * Returns `null` when no entry matches the slug, so the caller can render a 404.
 *
 * Throws when the query itself fails. These two cases must stay distinct: a
 * Contentful outage that resolved to `null` would 404 every post at once and
 * get them deindexed.
 */
export async function getPost({
  slug,
  isPreview = false,
}: GetPostParams): Promise<Post | null> {
  let data;

  try {
    const apolloClient = getApolloServerClient({ isPreview });

    data = await apolloClient.query<PostQueryResposne>({
      query: GET_POST_QUERY,
      variables: { slug, preview: isPreview },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch post", { cause: error });
  }

  const post = data.data?.blogPostCollection.items[0];

  return post ? parseGraphQLPost(post) : null;
}
