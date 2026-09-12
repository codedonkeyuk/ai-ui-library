import { useState, useEffect } from "react";
import type { JSX } from "react/jsx-runtime";
import styled from "styled-components";
import Pills from "../../../lib/components/Pills.tsx";
import GlobalStyle from "../../../lib/styles/global/GlobalStyle.tsx";
import AgentsMdOutput from "./AgentsMdOutput.tsx";
import ModelGenerator from "./ModelGenerator.tsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  font-size: 13px;
  color-scheme: light;
`;

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

export default function ConfigurationGenerator({
  configUrl,
}: Props): JSX.Element {
  const [configData, setConfigData] = useState<ConfigPayload | null>(null);

  const [mainPills, setMainPills] = useState<
    { id: string; label: string; selected: boolean }[]
  >([
    { id: "agents", label: "AGENTS.md", selected: true },
    { id: "models", label: "Models", selected: false },
  ]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(configUrl);
        if (!response.ok)
          throw new Error(`Failed to load file: ${response.statusText}`);
        const data: ConfigPayload = await response.json();

        setConfigData(data);
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, [configUrl]);

  if (error) return <h1>Error: {error}</h1>;
  if (!configData) return <h1>Loading file configuration...</h1>;

  const mainPillSelect = (clickedId: string | number) => {
    setMainPills((prev) =>
      prev.map((item) => ({ ...item, selected: item.id === clickedId })),
    );
  };

  const selectedPlatform = mainPills.find((pill) => pill.selected === true);

  const fullSystemPrompt = `${configData.systemSettings.trim()}\n\n## AVAILABLE COMPONENTS INVENTORY (TYPESCRIPT DEFINITIONS)\n${configData.componentInventory.trim()}`;

  return (
    <Container>
      <GlobalStyle />
      <div data-theme="light">
        <Pills items={mainPills} onChange={mainPillSelect} position="center" />
        <IgnoreMyStyles>
          {selectedPlatform?.id === "agents" && (
            <AgentsMdOutput
              configData={configData}
              fullSystemPrompt={fullSystemPrompt}
            />
          )}
          {selectedPlatform?.id === "models" && (
            <ModelGenerator
              configData={configData}
              fullSystemPrompt={fullSystemPrompt}
            />
          )}
        </IgnoreMyStyles>
      </div>
    </Container>
  );
}
