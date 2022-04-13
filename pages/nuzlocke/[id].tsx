import { GetServerSideProps } from "next";

import Nuzlocke from "src/pages/Nuzlocke";

import { addApolloState, initializeApollo } from "lib/apollo";

import QUERY_GET_NUZLOCKE from "src/pages/Nuzlocke/queryGetNuzlocke.graphql";

import type { GetNuzlockeQuery } from "@/generated/generated";

export default Nuzlocke;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const client = initializeApollo();

    await client.query<GetNuzlockeQuery>({
      query: QUERY_GET_NUZLOCKE,
      variables: {
        id: ctx?.params?.id,
      },
    });

    return addApolloState(client, {
      props: {},
    });
  } catch (error) {
    return {
      props: {},
    };
  }
};
