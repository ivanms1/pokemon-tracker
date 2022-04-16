import { useQuery } from "@apollo/client";
import { Controller } from "react-hook-form";

import { Select } from "@mantine/core";

import QUERY_GET_POKEMONS_BY_GAME from "./queryGetPokemonsByGame.gql";

import { pokemonApiClient } from "lib/apollo";

import { GAMES } from "src/const";

interface PokemonSelect {
  label?: string;
  placeholder?: string;
  name: string;
  gameId: number;
  control: any;
  error?: string;
}

function PokemonSelect({ gameId, name, control, ...props }: PokemonSelect) {
  const { data } = useQuery(QUERY_GET_POKEMONS_BY_GAME, {
    variables: {
      gen: GAMES[gameId].generation,
    },
    client: pokemonApiClient,
  });

  const pokemonOptions =
    data?.pokemons?.map(
      (p: {
        id: number;
        name: string;
        typesData: { types: { id: number }[] }[];
      }) => ({
        value: p.id,
        label: p.name,
        types: p.typesData[0]?.types.map((t) => t.id),
      })
    ) ?? [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          searchable
          value={value}
          onChange={(val) => {
            const selectedPokemon = pokemonOptions.find(
              (p: { value: string }) => p?.value === val
            );
            onChange({
              value: selectedPokemon?.value,
              label: selectedPokemon?.label,
              types: selectedPokemon?.types,
            });
          }}
          data={pokemonOptions}
          {...props}
        />
      )}
    />
  );
}

export default PokemonSelect;
