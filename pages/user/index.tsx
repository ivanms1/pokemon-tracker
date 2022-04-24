import { addApolloState, initializeApollo } from "lib/apollo";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import User from "src/pages/User";

import QUERY_GET_NUZLOCKES from "src/pages/Home/queryGetNuzlockes.graphql";

export default User;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = initializeApollo();

  const session = await getSession(ctx);

  await client.query({
    query: QUERY_GET_NUZLOCKES,
    context: {
      headers: {
        Authorization: session?.id,
      },
    },
  });

  return addApolloState(client, {
    props: {},
  });
};
