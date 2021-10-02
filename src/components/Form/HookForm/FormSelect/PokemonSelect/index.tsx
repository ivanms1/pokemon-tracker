import { useQuery } from "@apollo/client";
import { pokemonApiClient } from "lib/apollo";
import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { GAMES } from "src/const";

import QUERY_GET_POKEMONS_BY_GAME from "./queryGetPokemonsByGame.gql";

interface PokemonSelect {
  name: string;
  gameId: number;
  control: any;
}

function PokemonSelect({ gameId, name, control, ...props }: PokemonSelect) {
  const { data } = useQuery(QUERY_GET_POKEMONS_BY_GAME, {
    variables: {
      gen: GAMES[gameId].generation,
    },
    client: pokemonApiClient,
  });

  const pokemonOptions =
    data?.pokemons?.map((p: { id: number; name: string }) => ({
      value: p.id,
      label: p.name,
    })) ?? [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          instanceId={name}
          value={value}
          onChange={onChange}
          options={pokemonOptions}
          menuPortalTarget={isWindowPresent() ? document.body : null}
          {...props}
        />
      )}
    />
  );
}

export default PokemonSelect;
