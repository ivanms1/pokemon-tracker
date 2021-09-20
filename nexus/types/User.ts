import { objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.list.field("nuzlockes", {
      type: "Nuzlocke",
    });
  },
});
