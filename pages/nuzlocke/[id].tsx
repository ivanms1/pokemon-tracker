import { GetStaticPaths, GetStaticProps } from "next";

import Nuzlocke from "src/pages/Nuzlocke";

import { client } from "lib/apollo";

import QUERY_GET_NUZLOCKE from "./queryGetNuzlocke.graphql";
import QUERY_GET_NUZLOCKES from "src/pages/Home/queryGetNuzlockes.graphql";

import type {
  GetNuzlockeQuery,
  GetNuzlockesQuery,
} from "@/generated/generated";

export default Nuzlocke;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = await client.query<GetNuzlockeQuery>({
    query: QUERY_GET_NUZLOCKE,
    variables: {
      id: ctx?.params?.id,
    },
  });

  return {
    props: {
      nuzlocke: res?.data?.nuzlocke,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.query<GetNuzlockesQuery>({
    query: QUERY_GET_NUZLOCKES,
  });

  const paths = res.data?.nuzlockes.map((nuzlocke) => ({
    params: { id: nuzlocke.id },
  }));

  return {
    paths,
    fallback: false,
  };
};
