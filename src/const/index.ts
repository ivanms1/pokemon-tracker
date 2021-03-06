/** Token name in localstorage*/
export const TOKEN_NAME = "pokemon-tracker-app";

/** List of pokemons statuses*/
export const POKEMON_STATUSES = [
  {
    label: "Seen",
    value: "SEEN",
  },
  { value: "IN_TEAM", label: "In Team" },
  {
    value: "IN_PC",
    label: "In PC",
  },
  { value: "DEAD", label: "Dead" },
];

/** List of games types*/
export const GAME_TYPES = [
  {
    label: "Normal",
    value: "NORMAL",
  },
  {
    label: "Soul Link",
    value: "SOUL_LINK",
  },
  { label: "Cagelocke", value: "CAGELOCKE" },
];

/** List of pokemon types*/
export const POKEMON_TYPES: {
  [key: number]: {
    id: number;
    name: string;
  };
} = {
  1: {
    id: 1,
    name: "normal",
  },
  2: {
    id: 2,
    name: "fighting",
  },
  3: {
    id: 3,
    name: "flying",
  },
  4: {
    id: 4,
    name: "poison",
  },
  5: {
    id: 5,
    name: "ground",
  },
  6: {
    id: 6,
    name: "rock",
  },
  7: {
    id: 7,
    name: "bug",
  },
  8: {
    id: 8,
    name: "ghost",
  },
  9: {
    id: 9,
    name: "steel",
  },
  10: {
    id: 10,
    name: "fire",
  },
  11: {
    id: 11,
    name: "water",
  },
  12: {
    id: 12,
    name: "grass",
  },
  13: {
    id: 13,
    name: "electric",
  },
  14: {
    id: 14,
    name: "psychic",
  },
  15: {
    id: 15,
    name: "ice",
  },
  16: {
    id: 16,
    name: "dragon",
  },
  17: {
    id: 17,
    name: "dark",
  },
  18: {
    id: 18,
    name: "fairy",
  },
  10001: {
    id: 10001,
    name: "unknown",
  },
  10002: {
    id: 10002,
    name: "shadow",
  },
};

/** List of games and their regions */
export const GAME_OPTIONS = [
  {
    id: 1,
    name: "red",
    label: "Red",
    region: [1],
  },
  {
    id: 2,
    name: "blue",
    label: "Blue",
    region: [1],
  },
  {
    id: 3,
    name: "yellow",
    label: "Yellow",
    region: [1],
  },
  {
    id: 4,
    name: "gold",
    label: "Gold",
    region: [1, 2],
  },
  {
    id: 5,
    name: "silver",
    label: "Silver",
    region: [1, 2],
  },
  {
    id: 6,
    name: "crystal",
    label: "Crystal",
    region: [1, 2],
  },
  {
    id: 7,
    name: "ruby",
    label: "Ruby",
    region: [3],
  },
  {
    id: 8,
    name: "sapphire",
    label: "Sapphire",
    region: [3],
  },
  {
    id: 9,
    name: "emerald",
    label: "Emerald",
    region: [3],
  },
  {
    id: 10,
    name: "fire-red",
    label: "Fire Red",
    region: [1],
  },
  {
    id: 11,
    name: "leaf-green",
    label: "Leaf Green",
    region: [1],
  },
  {
    id: 12,
    name: "diamond",
    label: "Diamond",
    region: [4],
  },
  {
    id: 13,
    name: "pearl",
    label: "Pearl",
    region: [4],
  },
  {
    id: 14,
    name: "platinum",
    label: "Platinum",
    region: [4],
  },
  {
    id: 15,
    name: "HeartGold",
    label: "Sapphire",
    region: [1, 2],
  },
  {
    id: 16,
    name: "soulsilver",
    label: "SoulSilver",
    region: [1, 2],
  },
  {
    id: 17,
    name: "black",
    label: "Black",
    region: [5],
  },
  {
    id: 18,
    name: "white",
    label: "White",
    region: [5],
  },
  {
    id: 21,
    name: "black-2",
    label: "Black 2",
    region: [5],
  },
  {
    id: 22,
    name: "white-2",
    label: "White 2",
    region: [5],
  },
  {
    id: 23,
    name: "x",
    label: "X",
    region: [6],
  },
  {
    id: 24,
    name: "y",
    label: "Y",
    region: [6],
  },
  {
    id: 25,
    name: "omega-ruby",
    label: "Omega Ruby",
    region: [3],
  },
  {
    id: 26,
    name: "alpha-sapphire",
    label: "Alpha Sapphire",
    region: [3],
  },
  {
    id: 27,
    name: "sun",
    label: "Sun",
    region: [7],
  },
  {
    id: 28,
    name: "moon",
    label: "Moon",
    region: [7],
  },
  {
    id: 29,
    name: "ultra-sun",
    label: "Ultra Sun",
    region: [7],
  },
  {
    id: 30,
    name: "ultra-moon",
    label: "Ultra Moon",
    region: [7],
  },
  {
    id: 31,
    name: "lets-go-pikachu",
    label: "Let's Go, Pikachu",
    region: [1],
  },
  {
    id: 32,
    name: "lets-go-eevee",
    label: "Let's Go, Eevee",
    region: [1],
  },
  {
    id: 33,
    name: "sword",
    label: "Sword",
    region: [8],
  },
  {
    id: 34,
    name: "shield",
    label: "Shield",
    region: [8],
  },
];

/** List of games and their regions in object format*/
export const GAMES: {
  [key: number]: {
    id: number;
    name: string;
    label: string;
    region: number[];
    generation: number;
  };
} = {
  1: {
    id: 1,
    name: "red",
    label: "Red",
    region: [1],
    generation: 1,
  },
  2: {
    id: 2,
    name: "blue",
    label: "Blue",
    region: [1],
    generation: 1,
  },
  3: {
    id: 3,
    name: "yellow",
    label: "Yellow",
    region: [1],
    generation: 1,
  },
  4: {
    id: 4,
    name: "gold",
    label: "Gold",
    region: [1, 2],
    generation: 2,
  },
  5: {
    id: 5,
    name: "silver",
    label: "Silver",
    region: [1, 2],
    generation: 2,
  },
  6: {
    id: 6,
    name: "crystal",
    label: "Crystal",
    region: [1, 2],
    generation: 2,
  },
  7: {
    id: 7,
    name: "ruby",
    label: "Ruby",
    region: [3],
    generation: 3,
  },
  8: {
    id: 8,
    name: "sapphire",
    label: "Sapphire",
    region: [3],
    generation: 3,
  },
  9: {
    id: 9,
    name: "emerald",
    label: "Emerald",
    region: [3],
    generation: 3,
  },
  10: {
    id: 10,
    name: "fire-red",
    label: "Fire Red",
    region: [1],
    generation: 3,
  },
  11: {
    id: 11,
    name: "leaf-green",
    label: "Leaf Green",
    region: [1],
    generation: 3,
  },
  12: {
    id: 12,
    name: "diamond",
    label: "Diamond",
    region: [4],
    generation: 4,
  },
  13: {
    id: 13,
    name: "pearl",
    label: "Pearl",
    region: [4],
    generation: 4,
  },
  14: {
    id: 14,
    name: "platinum",
    label: "Platinum",
    region: [4],
    generation: 4,
  },
  15: {
    id: 15,
    name: "HeartGold",
    label: "Sapphire",
    region: [1, 2],
    generation: 4,
  },
  16: {
    id: 16,
    name: "soulsilver",
    label: "SoulSilver",
    region: [1, 2],
    generation: 4,
  },
  17: {
    id: 17,
    name: "black",
    label: "Black",
    region: [5],
    generation: 5,
  },
  18: {
    id: 18,
    name: "white",
    label: "White",
    region: [5],
    generation: 5,
  },
  21: {
    id: 21,
    name: "black-2",
    label: "Black 2",
    region: [5],
    generation: 5,
  },
  22: {
    id: 22,
    name: "white-2",
    label: "White 2",
    region: [5],
    generation: 5,
  },
  23: {
    id: 23,
    name: "x",
    label: "X",
    region: [6],
    generation: 6,
  },
  24: {
    id: 24,
    name: "y",
    label: "Y",
    region: [6],
    generation: 6,
  },
  25: {
    id: 25,
    name: "omega-ruby",
    label: "Omega Ruby",
    region: [3],
    generation: 6,
  },
  26: {
    id: 26,
    name: "alpha-sapphire",
    label: "Alpha Sapphire",
    region: [3],
    generation: 6,
  },
  27: {
    id: 27,
    name: "sun",
    label: "Sun",
    region: [7],
    generation: 7,
  },
  28: {
    id: 28,
    name: "moon",
    label: "Moon",
    region: [7],
    generation: 7,
  },
  29: {
    id: 29,
    name: "ultra-sun",
    label: "Ultra Sun",
    region: [7],
    generation: 7,
  },
  30: {
    id: 30,
    name: "ultra-moon",
    label: "Ultra Moon",
    region: [7],
    generation: 7,
  },
  31: {
    id: 31,
    name: "lets-go-pikachu",
    label: "Let's Go, Pikachu",
    region: [1],
    generation: 7,
  },
  32: {
    id: 32,
    name: "lets-go-eevee",
    label: "Let's Go, Eevee",
    region: [1],
    generation: 7,
  },
  33: {
    id: 33,
    name: "sword",
    label: "Sword",
    region: [8],
    generation: 8,
  },
  34: {
    id: 34,
    name: "shield",
    label: "Shield",
    region: [8],
    generation: 8,
  },
};
