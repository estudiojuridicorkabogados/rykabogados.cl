import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/client-integration-nextjs";

import { env } from "@/lib/env";

import "server-only";

const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}`;

interface GetApolloServerClientOptions {
  isPreview?: boolean;
}

export function getApolloServerClient(
  options: GetApolloServerClientOptions = {}
) {
  const { isPreview = false } = options;

  const token = isPreview
    ? env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : env.CONTENTFUL_ACCESS_TOKEN;

  const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: GRAPHQL_ENDPOINT,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    });
  });

  return getClient();
}
