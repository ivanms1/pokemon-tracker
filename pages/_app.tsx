import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import Layout from "@/components/Layout";

import useApollo from "@/hooks/useApollo";

import "./styles/globals.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const client = useApollo(pageProps);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </SessionProvider>
  );
}
export default MyApp;
