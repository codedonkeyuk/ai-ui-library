import type { JSX } from "react/jsx-runtime";
import type { OutputProps } from "./Types";
import { useState } from "react";
import { Button } from "storybook/internal/components";
import styled from "styled-components";
import OpenAiOutput from "./OpenAiOutput";
import OllamaOutput from "./OllamaOutput";

const ButtonBar = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
`;

export default function ModelGenerator({
  configData,
  fullSystemPrompt,
}: OutputProps): JSX.Element {
  const [selectedModel, setSelectedModel] = useState<"ollama" | "openai">(
    "ollama",
  );

  return (
    <>
      <p>
        <strong>**WARNING:**</strong> Context stuffing can be detrimental as the
        library instructions are being sent along with every query. If you have
        a lot of memory this is not big deal. If memory is an issue id recommend
        you make a dedicated Library LLM for UI work, and use other agents for
        other stuff.
      </p>

      {/* OPTION A: Native Row-Level Variant Buttons (Matches Pill Layout behavior) */}
      <ButtonBar>
        <Button
          variant={selectedModel === "ollama" ? "solid" : "outline"}
          onClick={() => setSelectedModel("ollama")}
          size="small"
        >
          Ollama
        </Button>
        <Button
          variant={selectedModel === "openai" ? "solid" : "outline"}
          onClick={() => setSelectedModel("openai")}
          size="small"
        >
          OpenAI
        </Button>
      </ButtonBar>

      {selectedModel === "openai" && (
        <OpenAiOutput
          configData={configData}
          fullSystemPrompt={fullSystemPrompt}
        />
      )}
      {selectedModel === "ollama" && (
        <OllamaOutput
          configData={configData}
          fullSystemPrompt={fullSystemPrompt}
        />
      )}
    </>
  );
}
