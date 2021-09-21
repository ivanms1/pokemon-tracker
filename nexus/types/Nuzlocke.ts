import { enumType, extendType, inputObjectType, objectType } from "nexus";

export const Type = enumType({
  name: "NuzlockeType",
  description: "Type of nuzlocke",
  members: ["NORMAL", "CAGELOCKE", "SOUL_LINK"],
});

export const Nuzlocke = objectType({
  name: "Nuzlocke",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("title");
    t.nonNull.field("type", { type: Type });
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.field("user", { type: "User" });
    t.nonNull.list.nonNull.field("pokemons", { type: "Pokemon" });
    t.nonNull.int("gameId");
    t.string("description");
  },
});

export const CreateNuzlockeInputType = inputObjectType({
  name: "CreateNuzlockeInputType",
  description: "Arguments needed to creaste a new nuzlocke",
  definition(t) {
    t.nonNull.string("title");
    t.string("description");
    t.nonNull.string("userId");
  },
});

export const getNuzlockes = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getNuzlockes", {
      type: "Nuzlocke",
      async resolve(_root, _, ctx) {
        return ctx.prisma.nuzlocke.findMany({
          include: {
            user: true,
          },
        });
      },
    });
  },
});

export const createNuzlocke = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createNuzlocke", {
      type: "Nuzlocke",
      args: {
        input: "CreateNuzlockeInputType",
      },
      async resolve(_root, { input }, ctx) {
        if (!input) {
          throw Error("Args missing");
        }

        const newNuzlocke = await ctx.prisma.nuzlocke.create({
          data: input,
          include: {
            user: true,
          },
        });

        return newNuzlocke;
      },
    });
  },
});
