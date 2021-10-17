import { Controller, FieldError } from "react-hook-form";
import { SelectComponentsProps } from "react-select/src/Select";

import Select from "@/components/Select";

import isWindowPresent from "@/helpers/isWindowPresent";

interface FormSelect extends SelectComponentsProps {
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
        <Select
          instanceId={name}
          menuPortalTarget={isWindowPresent() ? document.body : null}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}
    />
  );
}

export default FormSelect;
