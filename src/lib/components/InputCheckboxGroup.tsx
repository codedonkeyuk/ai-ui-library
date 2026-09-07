import type { JSX } from "react/jsx-runtime";
import { FormInput, FormLabel } from "./InputCommon"; // Keep this import
import { styled } from "styled-components";

type Checkbox = {
  id: string;
  label: string;
  selected: boolean;
};

/**
 * Optional helper function, returns a new checkbox array with one checkbox's `selected` value updated.
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
  gap: 1.25rem;
  margin: 0;
  padding: 1.5rem;
  border: 1px solid var(--main-bdr-color);
  border-radius: 0.5rem;
  width: auto;
  max-width: 100%;
`;

const CheckboxLegend = styled.legend`
  padding: 0 0.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CheckboxDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  width: 100%;
`;

const CheckboxInput = styled(FormInput)`
  width: auto;
  padding: 0;
  margin: 0;
  cursor: pointer;
  accent-color: var(--prim-btn-bg-color);
`;

const CheckboxLabel = styled(FormLabel)`
  flex-grow: 1;
  text-align: left;
  cursor: pointer;
`;

interface Props {
  /** Title of group of checkboxes*/
  legend: string;
  /** checkbox data including slected state*/
  checkboxes: Checkbox[];
  /** when you select a checkbox this fundtion is fired */
  checkboxSelected: (id: string, selected: boolean) => void;
}

/** Renders a groupd of checkboxes */
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
          <CheckboxLabel htmlFor={`checkbox-${checkbox.id}`}>
            {checkbox.label}
          </CheckboxLabel>
          <CheckboxInput
            id={`checkbox-${checkbox.id}`}
            type="checkbox"
            checked={checkbox.selected}
            onChange={() => checkboxSelected(checkbox.id, !checkbox.selected)}
          />
        </CheckboxDiv>
      ))}
    </CheckboxFieldset>
  );
}
