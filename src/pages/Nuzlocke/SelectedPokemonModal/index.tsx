import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import SlideModal from "@/components/SlideModal";
import Button from "@/components/Button";
import PokemonImage from "@/components/PokemonImage";

import QUERY_GET_POKEMON_DETAILS from "./queryGetPokemonDetails.gql";

import useStore from "src/store/store";
import {
  useGetNuzlockeQuery,
  useRemovePokemonFromNuzlockeMutation,
} from "@/generated/generated";

import { pokemonApiClient } from "lib/apollo";

import { POKEMON_TYPES } from "src/const";

function SelectedPokemonModal() {
  const selectedPokemon = useStore((store) => store.selectedPokemon);
  const setSelectedPokemon = useStore((store) => store.setSelectedPokemon);

  const router = useRouter();

  const { id } = router.query;

  const { data: nuzlockeData } = useGetNuzlockeQuery({
    variables: {
      id: String(id),
    },
  });

  const [removePokemon] = useRemovePokemonFromNuzlockeMutation();

  const { data, loading } = useQuery(QUERY_GET_POKEMON_DETAILS, {
    variables: {
      id: selectedPokemon?.pokemonId,
    },
    skip: !selectedPokemon?.pokemonId,
    client: pokemonApiClient,
  });

  const { pokemon } = data || {};

  const handleDelete = () => {
    removePokemon({
      variables: {
        id: selectedPokemon?.id,
      },
      update(cache) {
        cache.modify({
          id: cache.identify(nuzlockeData?.nuzlocke!),
          fields: {
            pokemons(existingPokemons: any[], { readField }) {
              return existingPokemons.filter(
                (pok) => selectedPokemon?.id !== readField("id", pok)
              );
            },
          },
        });
      },
    });

    setSelectedPokemon(null);
  };

  if (!selectedPokemon) {
    return null;
  }

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
          <PokemonImage
            pokemonId={selectedPokemon?.pokemonId}
            width="300"
            height="300"
            artwork
          />
          <p>{pokemon?.name}</p>

          <div>
            {selectedPokemon?.types?.map((type) => (
              <p key={type}>{POKEMON_TYPES?.[type!].name}</p>
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
          <p>{selectedPokemon?.location} location </p>
          <Button type="button" variant="warning" onClick={handleDelete}>
            Delete
          </Button>
        </>
      )}
    </SlideModal>
  );
}

export default SelectedPokemonModal;
