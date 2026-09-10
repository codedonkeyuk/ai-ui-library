import type {
  DetailedHTMLProps,
  LabelHTMLAttributes,
  CSSProperties,
  InputHTMLAttributes,
  HTMLAttributes,
  SelectHTMLAttributes,
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

export const FormDiv: IStyledComponentBase<
  "web",
  Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "style"
  > & {
    style?: CSSProperties | CSSPropertiesWithVars | undefined;
  }
> &
  string = styled.div`
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

export const FormWarning: IStyledComponentBase<
  "web",
  Omit<
    DetailedHTMLProps<
      HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >,
    "style"
  > & {
    style?: CSSProperties | CSSPropertiesWithVars | undefined;
  }
> &
  string = styled.p`
  margin: 0.1rem 0 0;
  color: var(--field-warning-color);
  font-size: 0.825rem;
  line-height: 1.4;
`;

export const FormDescription: IStyledComponentBase<
  "web",
  Omit<
    DetailedHTMLProps<
      HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >,
    "style"
  > & {
    style?: CSSProperties | CSSPropertiesWithVars | undefined;
  }
> &
  string = styled.p`
  margin: 0.1rem 0 0;
  color: var(--field-desc-color);
  font-size: 0.825rem;
  line-height: 1.4;
`;

export const FormSelect: IStyledComponentBase<
  "web",
  Omit<
    DetailedHTMLProps<
      SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    "style"
  > & {
    style?: CSSProperties | CSSPropertiesWithVars | undefined;
  }
> &
  string = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 100%;
  padding: 0.7rem 2.5rem 0.7rem 0.8rem;

  color: var(--field-fg-color);
  background-color: var(--field-bg-color);
  border: 1px solid var(--main-bdr-color);
  border-radius: 0.35rem;

  font: inherit;
  line-height: 1.4;
  height: auto;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 1rem;

  transition:
    border-color 150ms ease,
    box-shadow 150ms ease;

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
