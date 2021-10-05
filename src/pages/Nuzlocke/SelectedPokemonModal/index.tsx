import { useQuery } from "@apollo/client";

import SlideModal from "@/components/SlideModal";

import useStore from "src/store/store";

import { pokemonApiClient } from "lib/apollo";
import { POKEMON_TYPES } from "src/const";

import QUERY_GET_POKEMON_DETAILS from "./queryGetPokemonDetails.gql";

function SelectedPokemonModal() {
  const selectedPokemon = useStore((store) => store.selectedPokemon);
  const setSelectedPokemon = useStore((store) => store.setSelectedPokemon);

  const { data, loading } = useQuery(QUERY_GET_POKEMON_DETAILS, {
    variables: {
      id: selectedPokemon?.pokemonId,
    },
    skip: !selectedPokemon?.pokemonId,
    client: pokemonApiClient,
  });

  const { pokemon } = data || {};
  return (
    <SlideModal
      isOpen={!!selectedPokemon}
      onClose={() => setSelectedPokemon(null)}
    >
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <h1>{selectedPokemon?.nickname}</h1>
          <p>{pokemon?.name}</p>
          <div>
            {pokemon?.types?.map((type: { id: number }) => (
              <p key={type?.id}>{POKEMON_TYPES?.[type?.id].name}</p>
            ))}
          </div>
          <div>
            <span>height:</span>
            <p>{(pokemon?.height * 0.1).toFixed(1)} m</p>
          </div>
          <div>
            <span>weight:</span>
            <p>{(pokemon?.weight * 0.1).toFixed(1)} kg</p>
          </div>
        </>
      )}
    </SlideModal>
  );
}

export default SelectedPokemonModal;