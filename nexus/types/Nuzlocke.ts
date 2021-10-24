import {
  enumType,
  extendType,
  idArg,
  inputObjectType,
  nonNull,
  objectType,
} from "nexus";

export const Type = enumType({
  name: "NuzlockeType",
  description: "Type of nuzlocke",
  members: ["NORMAL", "CAGELOCKE", "SOUL_LINK"],
});

export const Nuzlocke = objectType({
  name: "Nuzlocke",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("title", {
      description: "A title for your nuzlocke",
    });
    t.nonNull.field("type", { type: Type });
    t.nonNull.field("createdAt", { type: "DateTime" });
    t.nonNull.field("updatedAt", { type: "DateTime" });
    t.nonNull.list.nonNull.field("pokemons", {
      type: "Pokemon",
      description: "List of valid encounter pokemons",
      resolve(_root, _args, ctx) {
        return ctx.prisma.pokemon.findMany({
          where: {
            nuzlockeId: _root.id,
          },
        });
      },
    });
    t.nonNull.int("gameId");
    t.string("description");
  },
});

export const CreateNuzlockeInput = inputObjectType({
  name: "CreateNuzlockeInput",
  description: "Arguments needed to creaste a new nuzlocke",
  definition(t) {
    t.nonNull.string("title");
    t.string("description");
    t.nonNull.field("type", {
      type: Type,
    });
    t.nonNull.int("gameId");
  },
});

export const getNuzlockes = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("getNuzlockes", {
      type: "Nuzlocke",
      resolve(_root, _, ctx) {
        return ctx.prisma.nuzlocke.findMany({
          include: {
            user: true,
          },
        });
      },
    });
  },
});

export const getNuzlocke = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getNuzlocke", {
      type: "Nuzlocke",
      args: { id: nonNull(idArg()) },
      resolve(_root, { id }, ctx) {
        if (!id) {
          throw Error("Nuzlocke id missing");
        }

        return ctx.prisma.nuzlocke.findUnique({
          where: { id },
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
        input: CreateNuzlockeInput,
      },
      async resolve(_root, { input }, ctx) {
        if (!input) {
          throw Error("Args missing");
        }

        const newNuzlocke = await ctx.prisma.nuzlocke.create({
          data: {
            ...input,
            user: {
              connect: {
                id: "ckv594e2o0000foi0huy69tyo",
              },
            },
          },
          include: {
            user: true,
          },
        });

        return newNuzlocke;
      },
    });
  },
});

export const DeleteNuzlocke = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteNuzlocke", {
      type: "String",
      args: {
        id: idArg(),
      },
      async resolve(_root, { id }, ctx) {
        if (!id) {
          throw Error("Pokemon id missing");
        }

        const deleteNuzlocke = await ctx.prisma.nuzlocke.delete({
          where: {
            id,
          },
        });

        return deleteNuzlocke.id;
      },
    });
  },
});
