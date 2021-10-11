import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import cx from "classnames";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: any;
  round?: boolean;
  label?: string;
  error?: FieldError | undefined;
}

function FormInput({
  id,
  type = "text",
  className,
  label,
  error,
  register,
  ...props
}: FormInputProps) {
  return (
    <div>
      {!!label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        className={cx("base-input", className)}
        type={type}
        {...register}
        {...props}
      />
      {error?.message && <span>{error.message}</span>}
    </div>
  );
}

export default FormInput;
