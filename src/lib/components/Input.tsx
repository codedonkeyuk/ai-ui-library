import { useId } from "react";
import type { ComponentPropsWithoutRef } from "react";
import type { JSX } from "react/jsx-runtime";
import {
  FormDescription,
  FormDiv,
  FormInput,
  FormLabel,
  FormWarning,
} from "./InputCommon";

interface Props extends ComponentPropsWithoutRef<"input"> {
  label: string;
  description?: string;
  warningMessage?: string;
  /** If true, adds a * to the label and sets aria-required/required */
  required?: boolean;
}

export default function Input({
  id,
  label,
  name,
  type,
  description,
  warningMessage,
  required,
  ...inputProps
}: Props): JSX.Element {
  const descriptionId = useId();
  const warningId = useId();

  const describedBy = [
    description ? descriptionId : null,
    warningMessage ? warningId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FormDiv>
      <FormLabel htmlFor={id}>
        {label}
        {required && " *"}
      </FormLabel>
      <FormInput
        {...inputProps}
        id={id}
        name={name}
        type={type}
        required={required}
        aria-required={required}
        aria-describedby={describedBy}
      />

      {description && (
        <FormDescription id={descriptionId}>{description}</FormDescription>
      )}

      {warningMessage && (
        <FormWarning id={warningId} role="alert">
          {warningMessage}
        </FormWarning>
      )}
    </FormDiv>
  );
}
