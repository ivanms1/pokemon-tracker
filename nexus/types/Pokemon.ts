import {
  enumType,
  extendType,
  idArg,
  inputObjectType,
  objectType,
} from "nexus";

export const Status = enumType({
  name: "PokemonStatus",
  description: "Pokemon status",
  members: ["SEEN", "IN_TEAM", "IN_PC", "DEAD"],
});

export const Pokemon = objectType({
  name: "Pokemon",
  description: "Any valid pokemon encounter during the nuzlocke",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("nickname");
    t.nonNull.int("pokemonId");
    t.nonNull.int("locationId");
    t.nonNull.field("status", {
      type: Status,
    });
  },
});

export const AddPokemonInput = inputObjectType({
  name: "AddPokemonInput",
  description: "Required field to add a pokemon to a nuzlocke",
  definition(t) {
    t.nonNull.string("nickname");
    t.nonNull.int("pokemonId");
    t.nonNull.int("locationId");
    t.nonNull.field("status", {
      type: Status,
    });
    t.nonNull.string("nuzlockeId");
  },
});

export const AddPokemonToNuzlocke = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addPokemonToNuzlocke", {
      type: "Pokemon",
      args: {
        input: "AddPokemonInput",
      },
      async resolve(_root, { input }, ctx) {
        if (!input) {
          throw Error("input missing");
        }

        const pokemon = await ctx.prisma.pokemon.create({
          data: input,
        });

        return pokemon;
      },
    });
  },
});

export const RemovePokemonFromNuzlocke = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("removePokemonFromNuzlocke", {
      type: "String",
      args: {
        id: idArg(),
      },
      async resolve(_root, { id }, ctx) {
        if (!id) {
          throw Error("Pokemon id missing");
        }

        const deletedId = await ctx.prisma.pokemon.delete({
          where: {
            id,
          },
        });

        return deletedId?.id;
      },
    });
  },
});

export const ChangePokemonStatus = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("changePokemonStatus", {
      type: "Pokemon",
      args: {
        id: idArg(),
        status: "PokemonStatus",
      },
      resolve(_root, { id, status }, ctx) {
        if (!id || !status) {
          throw Error("args missing");
        }

        return ctx.prisma.pokemon.update({
          where: {
            id,
          },
          data: {
            status,
          },
        });
      },
    });
  },
});
