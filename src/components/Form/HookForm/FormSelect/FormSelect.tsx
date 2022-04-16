import { Controller } from "react-hook-form";
import { Select, SelectProps } from "@mantine/core";

interface FormSelect extends SelectProps {
  control: any;
  name: string;
  label?: string;
  error?: string;
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
