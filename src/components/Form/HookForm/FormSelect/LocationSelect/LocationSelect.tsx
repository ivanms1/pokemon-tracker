import { Controller } from "react-hook-form";
import { useQuery } from "@apollo/client";

import { Select } from "@mantine/core";

import QUERY_GET_LOCATIONS_BY_REGION from "./queryGetLocationsByRegion.gql";

import { pokemonApiClient } from "lib/apollo";

import { GAMES } from "src/const";

interface LocationSelect {
  label?: string;
  placeholder?: string;
  name: string;
  gameId: number;
  control: any;
  error?: string;
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
          searchable
          value={value}
          onChange={(val) => {
            const selectedLocation = locations.find(
              (p: { value: string }) => p?.value === val
            );
            onChange({
              value: selectedLocation?.value,
              label: selectedLocation?.label,
            });
          }}
          data={locations}
          {...props}
        />
      )}
    />
  );
}

export default LocationSelect;
