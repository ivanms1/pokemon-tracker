import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import SlideModal from "@/components/SlideModal";
import Button from "@/components/Button";
import PokemonImage from "@/components/PokemonImage";
import TypeBox from "@/components/TypeBox";

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
      contentClass="h-full"
    >
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className="flex flex-col gap-8 h-full items-center text-lg justify-center">
          <h1 className="capitalize text-5xl font-semibold">
            {selectedPokemon?.nickname}
          </h1>
          <PokemonImage
            pokemonId={selectedPokemon?.pokemonId}
            width="300"
            height="300"
            artwork
          />
          <p className="capitalize text-3xl font-semibold">{pokemon?.name}</p>

          <div className="flex gap-x-2">
            {selectedPokemon?.types?.map((type) => (
              <TypeBox key={type} type={POKEMON_TYPES?.[type!].name} />
            ))}
          </div>
          <p>
            Captured in{" "}
            <span className="font-medium capitalize">
              {selectedPokemon?.location}
            </span>
          </p>
          <Button
            outlined
            type="button"
            variant="warning"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      )}
    </SlideModal>
  );
}

export default SelectedPokemonModal;
