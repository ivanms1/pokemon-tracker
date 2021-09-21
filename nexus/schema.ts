import { makeSchema } from "nexus";
import { join } from "path";

import * as types from "./types";

export const schema = makeSchema({
  types,
  sourceTypes: {
    modules: [{ module: ".prisma/client", alias: "PrismaClient" }],
  },
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: join(process.cwd(), "nexus", "schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "nexus", "context.ts"),
  },
});
