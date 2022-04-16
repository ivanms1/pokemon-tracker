import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "@/components/Form/HookForm/FormInput";
import FormSelect from "@/components/Form/HookForm/FormSelect";

import { GAME_OPTIONS, GAME_TYPES } from "src/const";

import { NuzlockeType, useCreateNuzlockeMutation } from "@/generated/generated";

import styles from "./NewNuzlocke.module.scss";

const schema = yup
  .object({
    title: yup.string().required("This is a required field"),
    description: yup.string().required("This is a required field"),
    gameId: yup.number().required("This is a required field"),
    type: yup.string().required("This is a required field"),
  })
  .required();

type FormData = {
  title: string;
  gameId: string;
  description: string;
  type: NuzlockeType;
};

function NewNuzlocke() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const [createNuzlocke, { loading }] = useCreateNuzlockeMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createNuzlocke({
        variables: {
          input: {
            ...data,
            gameId: Number(data?.gameId),
            type: data?.type,
          },
        },
      });
      router.push("/");
    } catch (error) {
      // TODO: handle error
    }
  };

  return (
    <div>
      <p className={styles.Title}>Create New Nuzlocke</p>
      <form className={styles.Form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Title"
          error={errors.title?.message}
          register={register("title")}
        />
        <FormSelect
          label="Game"
          name="gameId"
          control={control}
          error={errors.gameId?.message}
          data={GAME_OPTIONS.map((o) => ({
            value: String(o.id),
            label: o.label,
          }))}
        />
        <FormInput
          label="Description"
          error={errors.description?.message}
          register={register("description")}
        />
        <FormSelect
          label="Nuzlocke Type"
          className={styles.GameType}
          name="type"
          error={errors.type?.message}
          control={control}
          data={GAME_TYPES}
        />

        <Button type="submit" loading={loading} disabled={loading}>
          Create
        </Button>
      </form>
    </div>
  );
}

export default NewNuzlocke;
