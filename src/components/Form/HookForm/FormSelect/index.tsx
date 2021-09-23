import React from "react";
import { Controller, FieldError } from "react-hook-form";
import Select from "react-select";

interface FormSelect {
  control: any;
  name: string;
  options: any[];
  label?: string;
  error?: FieldError | undefined;
}

function FormSelect({ control, name, ...props }: FormSelect) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select value={value} onChange={onChange} {...props} />
      )}
    />
  );
}

export default FormSelect;
