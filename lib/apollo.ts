import { ApolloClient, InMemoryCache } from "@apollo/client";
console.log(`process.env`, window && window.location.hostname);
export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "http://localhost:3000/api/graphql"
      : `${process.env.VERCEL_URL}/api/graphql`,
  cache: new InMemoryCache(),
});

export const pokemonApiClient = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});
