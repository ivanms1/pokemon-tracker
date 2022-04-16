import React from "react";
import { TextInput, TextInputProps } from "@mantine/core";

interface FormInputProps extends TextInputProps {
  register: any;
}

function FormInput({ className, register, ...props }: FormInputProps) {
  return <TextInput className={className} {...register} {...props} />;
}

export default FormInput;
