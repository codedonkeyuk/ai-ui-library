import type { JSX } from "react/jsx-runtime";
import type { OutputProps } from "./Types";
import { useState } from "react";
import { Button } from "storybook/internal/components";
import OpenAiOutput from "./OpenAiOutput";
import OllamaOutput from "./OllamaOutput";
import { ButtonBar } from "../common/ButtonBar";

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
