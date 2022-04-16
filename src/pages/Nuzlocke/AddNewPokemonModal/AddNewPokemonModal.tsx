import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Modal } from "@mantine/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "@/components/Form/HookForm/FormInput";
import FormSelect from "@/components/Form/HookForm/FormSelect";
import LocationSelect from "@/components/Form/HookForm/FormSelect/LocationSelect";
import PokemonSelect from "@/components/Form/HookForm/FormSelect/PokemonSelect";

import GET_NUZLOCKE_QUERY from "../queryGetNuzlocke.graphql";

import {
  PokemonStatus,
  useAddPokemonToNuzlockeMutation,
} from "@/generated/generated";

import { POKEMON_STATUSES } from "src/const";

import styles from "./AddNewPokemonModal.module.scss";

type FormData = {
  nickname: string;
  locationId: {
    value: number;
    label: string;
  };
  status: PokemonStatus;
  pokemonId: {
    value: number;
    label: string;
    types: number[];
  };
};

const schema = yup
  .object({
    nickname: yup.string().required("This is a required field"),
    status: yup.string().required("This is a required field"),
    pokemonId: yup
      .object({
        value: yup.number().required("This is a required field"),
        label: yup.string().required("This is a required field"),
        type: yup.array(yup.number()),
      })
      .required("This is a required field"),
    locationId: yup
      .object({
        value: yup.string().required("This is a required field"),
        label: yup.string().required("This is a required field"),
      })
      .required(),
  })
  .required();

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
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

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
            status: data?.status,
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
            types: data?.pokemonId.types,
            status: data?.status,
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
    <Modal
      opened={isOpen}
      classNames={{
        body: styles.Modal,
      }}
      centered
      onClose={onClose}
    >
      <p className={styles.Title}>Add New pokemon</p>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Nickname"
          placeholder="Chubs"
          register={register("nickname")}
          error={errors.nickname?.message}
        />
        <PokemonSelect
          label="Pokemon"
          placeholder="Pikachu"
          name="pokemonId"
          control={control}
          gameId={gameId}
          error={errors.pokemonId?.value?.message}
        />
        <LocationSelect
          label="Location"
          placeholder="Route 1"
          name="locationId"
          control={control}
          gameId={gameId}
          error={errors.locationId?.value?.message}
        />
        <FormSelect
          name="status"
          label="Status"
          className={styles.StatusSelect}
          placeholder="In Team"
          control={control}
          data={POKEMON_STATUSES}
          error={errors.status?.message}
        />
        <Button type="submit" variant="light">
          Add
        </Button>
      </form>
    </Modal>
  );
}

export default AddNewPokemonModal;
