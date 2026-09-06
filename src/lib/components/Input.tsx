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
  color: #a33a3a;
  font-size: 0.825rem;
  line-height: 1.4;
`;

const FormDescription = styled.p`
  margin: 0.1rem 0 0;
  color: #666;
  font-size: 0.825rem;
  line-height: 1.4;
`;

interface Props extends ComponentPropsWithoutRef<"input"> {
  /** The label text for the input field */
  label: string;
  /** Optional help text (e.g., "Password must contain 8 characters") */
  description?: string;
  /** The message that should be shown if an error occurs */
  warningMessage?: string;
}

/**
 * Input component is an accessible input field that supports
 * both descriptive help text and error warnings.
 */
export default function Input({
  id,
  label,
  name,
  type,
  description,
  warningMessage,
  ...inputProps
}: Props): JSX.Element {
  // Generate stable, unique IDs for both description and warning
  const descriptionId = useId();
  const warningId = useId();

  // Combine IDs for aria-describedby if both exist
  const describedBy = [
    description ? descriptionId : null,
    warningMessage ? warningId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <FormDiv>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormInput
        {...inputProps}
        id={id}
        name={name}
        type={type}
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
