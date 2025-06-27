import { gql } from "@apollo/client";
import { getApolloServerClient } from "../getApolloServerClient";

import { Post as PostGraphQL } from "@/types/generated/graphql";
import { Post } from "@/types/global";

import { parseGraphQLPost } from "../parsers/posts";

interface GetPostParams {
  slug: string;
  isPreview?: boolean;
}

interface PostQueryResposne {
  postCollection: {
    items: PostGraphQL[];
  };
}

const GET_POST_QUERY = gql`
  query ($slug: String!, $locale: String!, $preview: Boolean!) {
    postCollection(
      where: { slug: $slug }
      preview: $preview
      locale: $locale
      limit: 1
    ) {
      items {
        title
        # metaTitle
        # metaDescription
        slug
        date
        richtext {
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
      }
    }
  }
`;

export async function getPost({
  slug,
  isPreview = false,
}: GetPostParams): Promise<Post> {
  try {
    const apolloClient = getApolloServerClient({ isPreview });

    const data = await apolloClient.query<PostQueryResposne>({
      query: GET_POST_QUERY,
      variables: { slug, preview: isPreview },
      context: {
        fetchOptions: {
          next: {
            revalidate:
              isPreview || process.env.DISABLE_CACHE === "true" ? 0 : 3600,
          },
        },
      },
    });

    const post = data.data.postCollection.items[0];

    return parseGraphQLPost(post);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch post");
  }
}
