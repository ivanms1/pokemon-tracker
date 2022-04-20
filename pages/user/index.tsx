import { addApolloState, initializeApollo } from "lib/apollo";
import { GetServerSideProps } from "next";

import User from "src/pages/User";

import QUERY_GET_NUZLOCKES from "src/pages/Home/queryGetNuzlockes.graphql";

export default User;

export const getServerSideProps: GetServerSideProps = async () => {
  const client = initializeApollo();
  await client.query({
    query: QUERY_GET_NUZLOCKES,
  });

  return addApolloState(client, {
    props: {},
  });
};
