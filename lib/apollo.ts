import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

const URI =
  process.env.NODE_ENV === "production"
    ? "https://pokemon-tracker-rho.vercel.app/api/graphql"
    : "http://localhost:3000/api/graphql";

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: createHttpLink({
      uri: URI,
      credentials: "same-origin",
    }),
  });
}

export function initializeApollo(initialState?: any) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.cache.extract();
    _apolloClient.cache.restore({
      ...existingCache,
      ...initialState,
    });
  }

  if (typeof window === "undefined") {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export const pokemonApiClient = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});
