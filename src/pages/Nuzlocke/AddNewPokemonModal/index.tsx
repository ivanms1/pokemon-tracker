import { SubmitHandler, useForm } from "react-hook-form";

import Button from "@/components/Button";
import FormInput from "@/components/Form/HookForm/FormInput";
import FormSelect from "@/components/Form/HookForm/FormSelect";
import LocationSelect from "@/components/Form/HookForm/FormSelect/LocationSelect";
import PokemonSelect from "@/components/Form/HookForm/FormSelect/PokemonSelect";

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
}

function AddNewPokemonModal({ nuzlockeId, gameId }: AddNewPokemonModal) {
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
      });
    } catch (error) {
      // TODO: handle error
    }
  };
  return (
    <div>
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
    </div>
  );
}

export default AddNewPokemonModal;
