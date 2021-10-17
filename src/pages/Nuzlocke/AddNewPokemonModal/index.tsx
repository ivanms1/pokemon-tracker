import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import FormInput from "@/components/Form/HookForm/FormInput";
import FormSelect from "@/components/Form/HookForm/FormSelect";
import LocationSelect from "@/components/Form/HookForm/FormSelect/LocationSelect";
import PokemonSelect from "@/components/Form/HookForm/FormSelect/PokemonSelect";
import Modal from "@/components/Modal";

import GET_NUZLOCKE_QUERY from "../queryGetNuzlocke.graphql";

import {
  PokemonStatus,
  useAddPokemonToNuzlockeMutation,
} from "@/generated/generated";

import { POKEMON_STATUSES } from "src/const";

type FormData = {
  nickname: string;
  locationId: {
    value: number;
    label: string;
  };
  status: {
    value: PokemonStatus;
    label: string;
  };
  types: number[];
  pokemonId: {
    value: number;
    label: string;
    types: number[];
  };
};

interface AddNewPokemonModal {
  nuzlockeId: string;
  gameId: number;
  isOpen: boolean;
  onClose: () => void;
}

function AddNewPokemonModal({
  nuzlockeId,
  gameId,
  isOpen,
  onClose,
}: AddNewPokemonModal) {
  const { register, handleSubmit, control, reset } = useForm<FormData>();

  const [addPokemon] = useAddPokemonToNuzlockeMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      addPokemon({
        variables: {
          input: {
            nuzlockeId: nuzlockeId,
            nickname: data?.nickname,
            types: data?.pokemonId.types,
            location: data?.locationId.label,
            locationId: data?.locationId?.value,
            pokemonId: data?.pokemonId?.value,
            status: data?.status?.value,
          },
        },
        update(cache, { data }) {
          const queryData: any = cache.readQuery({
            query: GET_NUZLOCKE_QUERY,
            variables: {
              id: nuzlockeId,
            },
          });

          cache.writeQuery({
            query: GET_NUZLOCKE_QUERY,
            variables: {
              id: nuzlockeId,
            },
            data: {
              nuzlocke: {
                ...queryData?.nuzlocke,
                pokemons: [
                  ...(queryData?.nuzlocke?.pokemons ?? []),
                  data?.pokemon,
                ],
              },
            },
          });
        },
        optimisticResponse: {
          pokemon: {
            id: new Date().toISOString(),
            nickname: data?.nickname,
            location: data?.locationId.label,
            locationId: data?.locationId?.value,
            pokemonId: data?.pokemonId?.value,
            types: [],
            status: data?.status?.value,
          },
        },
      });
      onClose();

      reset({
        nickname: "",
        locationId: undefined,
        status: undefined,
        pokemonId: undefined,
      });
    } catch (error) {
      // TODO: handle error
    }
  };
  return (
    <Modal isOpen={isOpen} className="py-5" onClose={onClose}>
      <p className="font-semibold text-2xl mb-6 text-center">Add New pokemon</p>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Nickname"
          placeholder="Chubs"
          register={register("nickname")}
        />
        <PokemonSelect
          label="Pokemon"
          placeholder="Pikachu"
          name="pokemonId"
          control={control}
          gameId={gameId}
        />
        <LocationSelect
          label="Location"
          placeholder="Route 1"
          name="locationId"
          control={control}
          gameId={gameId}
        />
        <FormSelect
          name="status"
          label="Status"
          className="mb-6"
          placeholder="In Team"
          control={control}
          options={POKEMON_STATUSES}
        />
        <Button type="submit" variant="secondary">
          Add
        </Button>
      </form>
    </Modal>
  );
}

export default AddNewPokemonModal;
