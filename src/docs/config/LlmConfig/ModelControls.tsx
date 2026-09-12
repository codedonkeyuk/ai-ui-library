import type { ChangeEvent, JSX } from "react";
import { Input } from "../../../lib/index";
import styled from "styled-components";

const FieldsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  width: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

type ModelFieldsProps = {
  modelName: string;
  temperature: number;
  topP: number;
  onModelNameChange: (value: string) => void;
  onTemperatureChange: (value: number) => void;
  onTopPChange: (value: number) => void;
};

export default function ModelFields({
  modelName,
  temperature,
  topP,
  onModelNameChange,
  onTemperatureChange,
  onTopPChange,
}: ModelFieldsProps): JSX.Element {
  const handleNumberChange =
    (onChange: (value: number) => void) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const value = parseFloat(event.target.value);
      onChange(Number.isNaN(value) ? 0 : value);
    };

  return (
    <FieldsRow>
      <div>
        <Input
          label="Base Model"
          type="text"
          value={modelName}
          onChange={(event) => onModelNameChange(event.target.value)}
        />
      </div>

      <div>
        <Input
          label="Temperature"
          type="number"
          min="0"
          max="1"
          step="0.05"
          value={temperature}
          onChange={handleNumberChange(onTemperatureChange)}
        />
      </div>

      <div>
        <Input
          label="Top P"
          type="number"
          min="0"
          max="1"
          step="0.05"
          value={topP}
          onChange={handleNumberChange(onTopPChange)}
        />
      </div>
    </FieldsRow>
  );
}
