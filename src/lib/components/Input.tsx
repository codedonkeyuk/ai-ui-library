import type { ComponentPropsWithoutRef } from "react";
import type { JSX } from "react/jsx-runtime";
import styled from "styled-components";
import { FormInput, FormLabel } from "./InputCommon.tsx";

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

interface Props extends ComponentPropsWithoutRef<"input"> {
  /** The label text for the input field */
  label: string;
  /** The message that should be show if an error occurs */
  warningMessage?: string;
}

/**
 * Input component is a accessible input field that can show various states.
 * It should be be used for any singualar input item a textfield, datefield for example.
 * Multiple inputs like checkboxes or radio buttons should be use InputCheckboxGroup or InputRadioGroup respectivley.
 */
export default function Input({
  id,
  label,
  name,
  type,
  warningMessage,
  ...inputProps
}: Props): JSX.Element {
  const warningId = `${id}-warning`;
  return (
    <FormDiv>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormInput
        {...inputProps}
        id={id}
        name={name}
        type={type}
        aria-describedby={warningMessage ? warningId : undefined}
      />
      {warningMessage && (
        <FormWarning id={warningId} role="status">
          {warningMessage}
        </FormWarning>
      )}
    </FormDiv>
  );
}
