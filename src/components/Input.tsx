import type { ComponentPropsWithoutRef } from "react";
import type { JSX } from "react/jsx-runtime";
import styled from "styled-components";

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
  max-width: 28rem;
`;

const FormLabel = styled.label`
  color: #263238;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.7rem 0.8rem;

  color: #263238;
  background-color: #fff;
  border: 1px solid #b8c2cc;
  border-radius: 0.35rem;

  font: inherit;
  line-height: 1.4;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;

  &::placeholder {
    color: #8996a3;
  }

  &:hover {
    border-color: #81909d;
  }

  &:focus {
    outline: none;
    border-color: #3478c5;
    box-shadow: 0 0 0 3px rgb(52 120 197 / 16%);
  }

  &:disabled {
    cursor: not-allowed;
    color: #7b8790;
    background-color: #f2f4f5;
  }
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
