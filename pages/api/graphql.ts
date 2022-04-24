import { ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";
import type { NextApiRequest, NextApiResponse } from "next";

import { schema } from "../../nexus/schema";
import { createContext } from "../../nexus/context";

const apolloServer = new ApolloServer({
  context: async ({ req }) => {
    const context = await createContext();
    return {
      ...context,
      accessToken: req?.headers?.authorization,
    };
  },
  schema,
  debug: true,
  introspection: true,
});

const startServer = apolloServer.start();

export default async function server(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://studio.apollographql.com"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
