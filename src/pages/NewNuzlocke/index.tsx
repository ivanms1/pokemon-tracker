import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import FormInput from "@/components/Form/HookForm/FormInput";
import Button from "@/components/Button";

import { NuzlockeType, useCreateNuzlockeMutation } from "@/generated/generated";

type FormData = {
  title: string;
  gameId: number;
  description: string;
  type: NuzlockeType;
};

function NewNuzlocke() {
  const { register, handleSubmit } = useForm<FormData>();
  const [createNuzlocke] = useCreateNuzlockeMutation();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await createNuzlocke({
        variables: {
          input: data,
        },
      });
    } catch (error) {
      // TODO: handle error
    }
  };
  return (
    <div>
      <p>Create new nuzlocke</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput label="Title" register={register("title")} />
        <FormInput
          label="Game"
          type="number"
          register={register("gameId", {
            valueAsNumber: true,
          })}
        />
        <FormInput label="Description" register={register("description")} />
        <FormInput label="Type" register={register("type")} />

        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}

export default NewNuzlocke;
