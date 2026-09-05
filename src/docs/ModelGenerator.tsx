import { useState, useEffect } from "react";
import type { JSX } from "react/jsx-runtime";
import { Input } from "../lib/index.ts";
import styled from "styled-components";
import Pills from "../lib/components/Pills.tsx";
import OpenAiOutput from "./OpenAiOutput.tsx";
import OllamaOutput from "./OllamaOutput.tsx";
import GlobalStyle from "../lib/styles/global/GlobalStyle.tsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  font-size: 13px;
`;

const FieldsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;

/** My own components bleed into page needed to keep code style consistent with other storybook blocks*/
const IgnoreMyStyles = styled.div`
  &,
  & *:not(button) {
    font-size: 13px !important;
    line-height: 1.5 !important;
    font-family:
      ui-monospace, Menlo, Monaco, "Roboto Mono", "Oxygen Mono",
      "Ubuntu Monospace", "Source Code Pro", "Droid Sans Mono", "Courier New",
      monospace !important;
  }
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
    (async () => {
      try {
        const response = await fetch(configUrl);
        if (!response.ok)
          throw new Error(`Failed to load file: ${response.statusText}`);
        const data: ConfigPayload = await response.json();

        setConfigData(data);
        setModelName(data.baseModel);
        setTemperature(data.parameters.temperature);
        setTopP(data.parameters.top_p);
      } catch (err: any) {
        setError(err.message);
      }
    })();
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
      prev.map((item) => ({ ...item, selected: item.id === clickedId })),
    );
  };

  const selectedPlatform = pills.find((pill) => pill.selected === true);
  const fullSystemPrompt = `${configData.systemSettings.trim()}\n\n## AVAILABLE COMPONENTS INVENTORY\n${formattedInventory.trim()}`;

  return (
    <Container>
      <GlobalStyle />
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
      <IgnoreMyStyles>
        {selectedPlatform?.id === "openai" && (
          <OpenAiOutput
            modelName={modelName}
            configData={configData}
            temperature={temperature}
            topP={topP}
            fullSystemPrompt={fullSystemPrompt}
          />
        )}
        {selectedPlatform?.id === "ollama" && (
          <OllamaOutput
            modelName={modelName}
            configData={configData}
            temperature={temperature}
            topP={topP}
            fullSystemPrompt={fullSystemPrompt}
          />
        )}
      </IgnoreMyStyles>
    </Container>
  );
}
