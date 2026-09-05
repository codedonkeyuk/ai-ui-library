import { useState, useEffect } from "react";
import type { JSX } from "react/jsx-runtime";
import { Input } from "../lib";
import styled from "styled-components";
import Pills from "../lib/components/Pills";
import OpenAiOutput from "./OpenAiOutput";
import OllamaOutput from "./OllamaOutput";

const FieldsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

interface Props {
  configUrl: string;
}

interface ComponentBlueprint {
  component: string;
  props: Record<string, { type: string; required: boolean }>;
}

interface ConfigPayload {
  baseModel: string;
  parameters: {
    temperature: number;
    top_p: number;
    stop: string;
  };
  systemSettings: string;
  componentInventory: string;
}

export default function ModelGenerator({ configUrl }: Props): JSX.Element {
  const [configData, setConfigData] = useState<ConfigPayload | null>(null);

  const [pills, setPills] = useState<
    { id: string; label: string; selected: boolean }[]
  >([
    { id: "ollama", label: "Ollama", selected: true },
    { id: "openai", label: "openai", selected: false },
  ]);

  const [error, setError] = useState<string | null>(null);

  const [modelName, setModelName] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0.3);
  const [topP, setTopP] = useState<number>(0.9);

  useEffect(() => {
    fetch(configUrl)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Failed to load file: ${response.statusText}`);
        return response.json();
      })
      .then((data: ConfigPayload) => {
        setConfigData(data);
        setModelName(data.baseModel);
        setTemperature(data.parameters.temperature);
        setTopP(data.parameters.top_p);
      })
      .catch((err) => setError(err.message));
  }, [configUrl]);

  if (error) return <h1>Error: {error}</h1>;
  if (!configData) return <h1>Loading file configuration...</h1>;

  const inventory: ComponentBlueprint[] = JSON.parse(
    configData.componentInventory,
  );

  let formattedInventory = "";
  for (const item of inventory) {
    formattedInventory += `### Component: <${item.component} />\nAllowed Properties:\n`;
    for (const [propName, meta] of Object.entries(item.props)) {
      formattedInventory += `  - ${propName} (${meta.required ? "Required" : "Optional"}): ${meta.type}\n`;
    }
    formattedInventory += "\n";
  }

  const handleSingleSelect = (clickedId: string | number) => {
    setPills((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === clickedId,
      })),
    );
  };

  const Output = () => {
    const selectedPlatform = pills.find((pill) => pill.selected === true);

    const fullSystemPrompt = `${configData.systemSettings.trim()}\n\n## AVAILABLE COMPONENTS INVENTORY\n${formattedInventory.trim()}`;

    if (selectedPlatform?.id === "openai") {
      return (
        <OpenAiOutput
          modelName={modelName}
          configData={configData}
          temperature={temperature}
          topP={topP}
          fullSystemPrompt={fullSystemPrompt}
        />
      );
    }
    return (
      <OllamaOutput
        modelName={modelName}
        configData={configData}
        temperature={temperature}
        topP={topP}
        fullSystemPrompt={fullSystemPrompt}
      />
    );
  };

  return (
    <div>
      <h3>Model Controls</h3>

      <FieldsRow>
        <div>
          <Input
            label="Base Model"
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
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
            onChange={(e) => setTemperature(parseFloat(e.target.value) || 0)}
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
            onChange={(e) => setTopP(parseFloat(e.target.value) || 0)}
          />
        </div>
      </FieldsRow>
      <Pills items={pills} onChange={handleSingleSelect} position="center" />
      <Output />
    </div>
  );
}
