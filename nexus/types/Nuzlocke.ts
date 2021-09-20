import { extendType, objectType } from "nexus";

export const Nuzlocke = objectType({
  name: "Nuzlocke",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("title");
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.string("description");
    t.field("user", { type: "User" });
  },
});

export const getNuzlockes = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getNuzlockes", {
      type: "Nuzlocke",
      resolve(_root, _, ctx) {
        return ctx.prisma.nuzlocke.findMany();
      },
    });
  },
});
