import { initializeApollo } from "lib/apollo";
import { GetStaticProps } from "next";

import Home from "src/pages/Home";

import QUERY_GET_NUZLOCKES from "src/pages/Home/queryGetNuzlockes.graphql";

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo();
  await client.query({
    query: QUERY_GET_NUZLOCKES,
  });

  return {
    props: {
      initialApolloCache: client.cache.extract(),
    },
  };
};
