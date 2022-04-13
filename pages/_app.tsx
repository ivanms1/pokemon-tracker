import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";

import Layout from "@/components/Layout";

import useApollo from "@/hooks/useApollo";

import "./styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
export default MyApp;
