import { enumType, objectType } from "nexus";

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
