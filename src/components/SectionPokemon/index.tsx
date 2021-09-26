import Image from "next/image";

import { Pokemon } from "@/generated/generated";

interface SectionPokemon {
  pokemon: Pokemon;
}

function SectionPokemon({ pokemon, ...props }: SectionPokemon) {
  return (
    <div {...props}>
      <Image
        alt={pokemon?.nickname}
        height="75"
        width="75"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.pokemonId}.png`}
      />
    </div>
  );
}

export default SectionPokemon;
