import type { ChangeEvent, JSX } from "react";
import { Form } from "storybook/internal/components";

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
    <Form>
      <Form.Field label="Base Model">
        <Form.Input
          type="text"
          value={modelName}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onModelNameChange(event.target.value)
          }
        />
      </Form.Field>

      <Form.Field label="Temperature">
        <Form.Input
          type="number"
          min={0}
          max={1}
          step={0.05}
          value={temperature}
          onChange={handleNumberChange(onTemperatureChange)}
        />
      </Form.Field>

      <Form.Field label="Top P">
        <Form.Input
          type="number"
          min={0}
          max={1}
          step={0.05}
          value={topP}
          onChange={handleNumberChange(onTopPChange)}
        />
      </Form.Field>
    </Form>
  );
}
