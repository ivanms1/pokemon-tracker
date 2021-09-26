import Image from "next/image";

import { Pokemon } from "@/generated/generated";

interface TeamPokemon {
  pokemon: Pokemon;
}

function TeamPokemon({ pokemon, ...props }: TeamPokemon) {
  return (
    <div {...props}>
      <Image
        alt={pokemon?.nickname}
        height="100"
        width="100"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.pokemonId}.png`}
      />
    </div>
  );
}

export default TeamPokemon;
