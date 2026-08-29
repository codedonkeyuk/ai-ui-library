import type { JSX } from "react/jsx-runtime";
import styled from "styled-components";

import { FormInput, FormLabel } from "./InputCommon";

export type Radio = {
  id: string;
  label: string;
  selected: boolean;
};

/**
 * Returns a new radio array with only the radio matching `id` selected.
 *
 * @param radios - The current radio collection.
 * @param id - The ID of the radio to select.
 * @returns A new radio array with one selected radio.
 *
 * @example
 * setRadios(current =>
 *   updateRadioArray(current, id)
 * );
 */
export const updateRadioArray = (radios: Radio[], id: string): Radio[] =>
  radios.map((radio) => ({
    ...radio,
    selected: radio.id === id,
  }));

const RadioFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  margin: 0;
  padding: 1rem;

  border: 1px solid #b8c2cc;
  border-radius: 0.35rem;
`;

const RadioLegend = styled.legend`
  padding: 0 0.25rem;

  color: #263238;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
`;

const RadioDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

interface Props {
  /** Name of the group of fildes, becomes the fieldsets legend */
  legend: string;
  /** The array of radios which are rendered, min which state is kept */
  radios: Radio[];
  /** Is triggered when a radio is selected, you must update the state using the recieved id */
  radioSelected: (id: string) => void;
}

/** Renders a Fieldset containing multiple radio buttons */
export default function InputRadioGroup({
  legend,
  radios,
  radioSelected,
}: Props): JSX.Element {
  return (
    <RadioFieldset>
      <RadioLegend>{legend}</RadioLegend>

      <RadioDiv>
        {radios.map((radio) => {
          const inputId = `radio-${radio.id}`;

          return (
            <div key={radio.id}>
              <FormInput
                id={inputId}
                name="radio-group"
                type="radio"
                checked={radio.selected}
                onChange={() => radioSelected(radio.id)}
              />

              <FormLabel htmlFor={inputId}>{radio.label}</FormLabel>
            </div>
          );
        })}
      </RadioDiv>
    </RadioFieldset>
  );
}
