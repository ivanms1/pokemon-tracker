import React from "react";
import { default as LSelect } from "react-select";

import isWindowPresent from "@/helpers/isWindowPresent";
import { SelectComponentsProps } from "react-select/src/Select";

interface Select extends SelectComponentsProps {
  id?: string;
  instanceId?: string;
  label?: string;
}

function Select({ id, label, ...props }: Select) {
  return (
    <div>
      {!!label && (
        <label
          htmlFor={id}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {label}
        </label>
      )}
      <LSelect
        menuPortalTarget={isWindowPresent() ? document.body : null}
        {...props}
      />
    </div>
  );
}

export default Select;
