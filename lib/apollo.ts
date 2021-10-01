import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const URI =
  process.env.NODE_ENV === "production"
    ? "https://pokemon-tracker-rho.vercel.app/api/graphql"
    : "http://localhost:3000/api/graphql";

export const client = new ApolloClient({
  ssrMode: true,
  uri: URI,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  link: createHttpLink({
    uri: URI,
    credentials: "same-origin",
  }),
});

export const pokemonApiClient = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});
