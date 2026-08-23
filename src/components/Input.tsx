import type { ComponentPropsWithoutRef } from "react";
import type { JSX } from "react/jsx-runtime";
import styled from "styled-components";
import { FormInput, FormLabel } from "./InputCommon.tsx";

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
  max-width: 28rem;
`;

const FormWarning = styled.p`
  margin: 0.1rem 0 0;
  color: #a33a3a;
  font-size: 0.825rem;
  line-height: 1.4;
`;

interface Props extends ComponentPropsWithoutRef<"input"> {
  label: string;
  warningMessage?: string;
}

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
