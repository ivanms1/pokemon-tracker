import { addApolloState, initializeApollo } from "lib/apollo";
import { GetServerSideProps } from "next";

import Home from "src/pages/Home";

import QUERY_GET_NUZLOCKES from "src/pages/Home/queryGetNuzlockes.graphql";

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const client = initializeApollo();
  await client.query({
    query: QUERY_GET_NUZLOCKES,
  });

  return addApolloState(client, {
    props: {},
  });
};
