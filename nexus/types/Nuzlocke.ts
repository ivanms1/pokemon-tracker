import { objectType } from "nexus";

export const Nuzlocke = objectType({
  name: "Nuzlocke",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("title");
    t.nonNull.string("createdAt");
    t.nonNull.string("updatedAt");
    t.string("description");
    t.field("user", { type: "User" });
  },
});
