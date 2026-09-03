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
  color: #263238;
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
