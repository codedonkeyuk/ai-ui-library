import type { JSX } from "react/jsx-runtime";
import { FormInput, FormLabel } from "./InputCommon";
import styled from "styled-components";

type Checkbox = {
  id: string;
  label: string;
  selected: boolean;
};

/**
 * Optional helper function, returns a new checkbox array with one checkbox's `selected` value updated.
 *
 * @param checkboxes - The current checkbox collection.
 * @param id - The ID of the checkbox to update.
 * @param selected - The new selected state.
 * @returns A new array with the matching checkbox updated.
 *
 * @example
 * setCheckboxes(current =>
 *   updateCheckboxArray(current, id, selected)
 * );
 */
export const updateCheckboxArray = (
  checkboxes: Checkbox[],
  id: string,
  selected: boolean,
): Checkbox[] =>
  checkboxes.map((checkbox) =>
    checkbox.id === id ? { ...checkbox, selected } : checkbox,
  );

const CheckboxFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  margin: 0;
  padding: 1rem;

  border: 1px solid #b8c2cc;
  border-radius: 0.35rem;
`;

const CheckboxLegend = styled.legend`
  padding: 0 0.25rem;

  color: #263238;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.4;
`;

const CheckboxDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

interface Props {
  /** The name of the group of fields. Legen belonging to the wrapping fieldset. */
  legend: string;
  /** The array of checkboxes from which the group is rendered */
  checkboxes: Checkbox[];
  /** When a checkbox is selected this function will retrun the id and new state. Its upto you to update the checkboxes array*/
  checkboxSelected: (id: string, selected: boolean) => void;
}

/** Renders a Fieldset containing multiple checkboxes */
export default function InputCheckboxGroup({
  legend,
  checkboxes,
  checkboxSelected,
}: Props): JSX.Element {
  return (
    <CheckboxFieldset>
      <CheckboxLegend>{legend}</CheckboxLegend>
      {checkboxes.map((checkbox) => (
        <CheckboxDiv key={checkbox.id}>
          <FormInput
            id={`checkbox-${checkbox.id}`}
            type="checkbox"
            checked={checkbox.selected}
            onChange={() => checkboxSelected(checkbox.id, !checkbox.selected)}
          />
          <FormLabel htmlFor={`checkbox-${checkbox.id}`}>
            {checkbox.label}
          </FormLabel>
        </CheckboxDiv>
      ))}
    </CheckboxFieldset>
  );
}
