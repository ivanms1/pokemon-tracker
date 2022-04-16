import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Button, Loader, Drawer } from "@mantine/core";

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

import styles from "./SelectedPokemonModal.module.scss";

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
    <Drawer
      opened={!!selectedPokemon}
      onClose={() => setSelectedPokemon(null)}
      position="right"
      className={styles.SelectedPokemonModal}
      size="xl"
    >
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.Content}>
          <h1 className={styles.PokemonNickname}>
            {selectedPokemon?.nickname}
          </h1>
          <PokemonImage
            pokemonId={selectedPokemon?.pokemonId}
            width="300"
            height="300"
            artwork
          />
          <p className={styles.PokemonName}>{pokemon?.name}</p>

          <div className={styles.Pokemons}>
            {selectedPokemon?.types?.map((type) => (
              <TypeBox key={type} type={POKEMON_TYPES?.[type!].name} />
            ))}
          </div>
          <p>
            Captured in{" "}
            <span className={styles.Location}>{selectedPokemon?.location}</span>
          </p>
          <Button
            type="button"
            variant="white"
            color="red"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      )}
    </Drawer>
  );
}

export default SelectedPokemonModal;
