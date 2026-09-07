import { useId } from "react";
import type { ComponentPropsWithoutRef } from "react";
import type { JSX } from "react/jsx-runtime";
import styled from "styled-components";
import { FormInput, FormLabel } from "./InputCommon";

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  flex: 1 1 200px;
  min-width: 0;
  width: 100%;

  input,
  select,
  textarea {
    width: 100%;
    box-sizing: border-box;
  }
`;

const FormWarning = styled.p`
  margin: 0.1rem 0 0;
  color: var(--field-warning-color);
  font-size: 0.825rem;
  line-height: 1.4;
`;

const FormDescription = styled.p`
  margin: 0.1rem 0 0;
  color: var(--field-desc-color);
  font-size: 0.825rem;
  line-height: 1.4;
`;

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
