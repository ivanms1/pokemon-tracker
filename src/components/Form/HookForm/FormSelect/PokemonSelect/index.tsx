import { useQuery } from "@apollo/client";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { SelectComponentsProps } from "react-select/src/Select";

import QUERY_GET_POKEMONS_BY_GAME from "./queryGetPokemonsByGame.gql";

import isWindowPresent from "@/helpers/isWindowPresent";
import { pokemonApiClient } from "lib/apollo";

import { GAMES } from "src/const";

interface PokemonSelect extends SelectComponentsProps {
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
