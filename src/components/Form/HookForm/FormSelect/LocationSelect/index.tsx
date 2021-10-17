import { Controller } from "react-hook-form";
import { SelectComponentsProps } from "react-select/src/Select";
import { useQuery } from "@apollo/client";

import Select from "@/components/Select";

import QUERY_GET_LOCATIONS_BY_REGION from "./queryGetLocationsByRegion.gql";

import { pokemonApiClient } from "lib/apollo";

import { GAMES } from "src/const";

interface LocationSelect extends SelectComponentsProps {
  name: string;
  gameId: number;
  control: any;
}

function LocationSelect({ gameId, name, control, ...props }: LocationSelect) {
  const { data } = useQuery(QUERY_GET_LOCATIONS_BY_REGION, {
    variables: {
      id: GAMES[gameId].region[0],
    },
    client: pokemonApiClient,
  });

  const { data: secondRegionData } = useQuery(QUERY_GET_LOCATIONS_BY_REGION, {
    variables: {
      id: GAMES[gameId].region[1],
    },
    skip: !GAMES[gameId].region[1],
    client: pokemonApiClient,
  });

  const locations = [
    ...(data?.region?.locations ?? []),
    ...(secondRegionData?.region?.locations ?? []),
  ].map((l) => ({ value: l.id, label: l.name.replace(/-/g, " ") }));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select
          instanceId={name}
          value={value}
          onChange={onChange}
          options={locations}
          {...props}
        />
      )}
    />
  );
}

export default LocationSelect;
