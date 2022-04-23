import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import Layout from "@/components/Layout";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

import useApollo from "@/hooks/useApollo";

import "./styles/globals.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const client = useApollo(pageProps);

  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
export default MyApp;
