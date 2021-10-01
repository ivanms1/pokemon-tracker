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
  pokemonId: {
    value: number;
    label: string;
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
  const { register, handleSubmit, control } = useForm<FormData>();

  const [addPokemon] = useAddPokemonToNuzlockeMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      addPokemon({
        variables: {
          input: {
            nuzlockeId: nuzlockeId,
            nickname: data?.nickname,
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
      });
      onClose();
    } catch (error) {
      // TODO: handle error
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p>Add New pokemon</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput register={register("nickname")} />
        <LocationSelect name="locationId" control={control} gameId={gameId} />
        <PokemonSelect name="pokemonId" control={control} gameId={gameId} />
        <FormSelect
          name="status"
          control={control}
          options={POKEMON_STATUSES}
        />
        <Button type="submit">Add</Button>
      </form>
    </Modal>
  );
}

export default AddNewPokemonModal;
