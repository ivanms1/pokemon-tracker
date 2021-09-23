import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";

import FormInput from "@/components/Form/HookForm/FormInput";
import FormSelect from "@/components/Form/HookForm/FormSelect";
import Button from "@/components/Button";

import { GAME_OPTIONS, GAME_TYPES } from "src/const";

import { NuzlockeType, useCreateNuzlockeMutation } from "@/generated/generated";

type FormData = {
  title: string;
  gameId: {
    value: number;
    label: string;
  };
  description: string;
  type: {
    value: NuzlockeType;
    label: string;
  };
};

function NewNuzlocke() {
  const { register, handleSubmit, control } = useForm<FormData>();
  const [createNuzlocke] = useCreateNuzlockeMutation();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createNuzlocke({
        variables: {
          input: {
            ...data,
            gameId: data?.gameId?.value,
            type: data?.type?.value,
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
      <p>Create new nuzlocke</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Title" register={register("title")} />
        <FormSelect
          name="gameId"
          control={control}
          options={GAME_OPTIONS.map((o) => ({ value: o.id, label: o.label }))}
        />
        <FormInput label="Description" register={register("description")} />
        <FormSelect name="type" control={control} options={GAME_TYPES} />

        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}

export default NewNuzlocke;
