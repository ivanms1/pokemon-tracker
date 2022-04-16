import Image from "next/image";

interface PokemonImage {
  pokemonId: number;
  artwork?: boolean;
  width: string | number;
  height: string | number;
}

function PokemonImage({
  pokemonId,
  artwork = false,
  width,
  height,
}: PokemonImage) {
  const url = artwork
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <Image src={url} width={width} height={height} alt={String(pokemonId)} />
  );
}

export default PokemonImage;
