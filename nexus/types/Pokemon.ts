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
    t.nonNull.field("nuzlocke", { type: "Nuzlocke" });
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
      type: "Nuzlocke",
      args: {
        input: "AddPokemonInput",
      },
      resolve(_root, { input }, ctx) {
        if (!input) {
          throw Error("input missing");
        }

        return ctx.prisma.pokemon.create({
          data: input,
        });
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
      resolve(_root, { id }, ctx) {
        if (!id) {
          throw Error("Pokemon id missing");
        }

        return ctx.prisma.pokemon.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
