import type {
  DetailedHTMLProps,
  LabelHTMLAttributes,
  CSSProperties,
  InputHTMLAttributes,
} from "react";
import styled from "styled-components";
import type {
  IStyledComponentBase,
  CSSPropertiesWithVars,
} from "styled-components/dist/types";

export const FormLabel: IStyledComponentBase<
  "web",
  Omit<
    DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
    "style"
  > & {
    style?: CSSProperties | CSSPropertiesWithVars | undefined;
  }
> &
  string = styled.label`
  color: var(--main-fg-color);
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const FormInput: IStyledComponentBase<
  "web",
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "style"
  > & {
    style?: CSSProperties | CSSPropertiesWithVars | undefined;
  }
> &
  string = styled.input`
  width: 100%;
  padding: 0.7rem 0.8rem;

  color: var(--field-fg-color);
  background-color: var(--field-bg-color);
  border: 1px solid var(--main-bdr-color);
  border-radius: 0.35rem;

  font: inherit;
  line-height: 1.4;
  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;

  &::placeholder {
    color: var(--field-placeholder-color);
  }

  &:hover {
    border-color: var(--prim-btn-bg-color);
  }

  &:focus {
    outline: none;
    border-color: var(--prim-btn-bg-color);
    box-shadow: 0 0 0 3px rgb(52 120 197 / 16%);
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--field-dis-fg-color);
    background-color: var(--field-dis-bg-color);
  }
`;
