import type { JSX } from "react/jsx-runtime";
import { styled } from "styled-components";

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
  gap: 1.25rem;

  margin: 0;
  padding: 1.5rem;

  border: 1px solid var(--main-bdr-color);
  border-radius: 0.5rem;
  width: auto;
  max-width: 100%;
`;

const RadioLegend = styled.legend`
  padding: 0 0.5rem;
  color: #263238;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
`;

const RadioDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const RadioRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  width: 100%;
`;

const StyledFormLabel = styled(FormLabel)`
  flex-grow: 1;
  text-align: left;
  cursor: pointer;
`;

const RadioInput = styled(FormInput)`
  width: auto;
  padding: 0;
  margin: 0;
  cursor: pointer;

  accent-color: var(--prim-btn-bg-color);
`;

interface Props {
  /** Name of the group of fields, becomes the fieldsets legend */
  legend: string;
  /** The array of radios which are rendered, from which state is kept */
  radios: Radio[];
  /** Is triggered when a radio is selected, you must update the state using the received id */
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
            <RadioRow key={radio.id}>
              <StyledFormLabel htmlFor={inputId}>{radio.label}</StyledFormLabel>

              <RadioInput
                id={inputId}
                name="radio-group"
                type="radio"
                checked={radio.selected}
                onChange={() => radioSelected(radio.id)}
              />
            </RadioRow>
          );
        })}
      </RadioDiv>
    </RadioFieldset>
  );
}
