import { useState, useEffect } from "react";
import type { JSX } from "react/jsx-runtime";
import { Button } from "storybook/internal/components";
import styled from "styled-components";
import AgentsMdOutput from "./AgentsMdOutput.tsx";
import ModelGenerator from "./ModelGenerator.tsx";
import { ButtonBar } from "../common/ButtonBar.tsx";

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  padding: 1rem;
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
  const [selectedTab, setSelectedTab] = useState<"agents" | "models">("agents");
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

  const fullSystemPrompt = `${configData.systemSettings.trim()}\n\n## AVAILABLE COMPONENTS INVENTORY (TYPESCRIPT DEFINITIONS)\n${configData.componentInventory.trim()}`;

  return (
    <PanelContainer>
      {/* Replaced old local Pills with Storybook 10 compliant native Button selectors */}
      <ButtonBar>
        <Button
          variant={selectedTab === "agents" ? "solid" : "outline"}
          onClick={() => setSelectedTab("agents")}
          size="small"
        >
          AGENTS.md
        </Button>
        <Button
          variant={selectedTab === "models" ? "solid" : "outline"}
          onClick={() => setSelectedTab("models")}
          size="small"
        >
          Models
        </Button>
      </ButtonBar>

      {/* Storybook components natively take care of typography/monospacing style leaks */}
      {selectedTab === "agents" && (
        <AgentsMdOutput
          configData={configData}
          fullSystemPrompt={fullSystemPrompt}
        />
      )}
      {selectedTab === "models" && (
        <ModelGenerator
          configData={configData}
          fullSystemPrompt={fullSystemPrompt}
        />
      )}
    </PanelContainer>
  );
}
