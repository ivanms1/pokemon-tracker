import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? `https://${process.env.VERCEL_URL}/api/graphql`
      : "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export const pokemonApiClient = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});
