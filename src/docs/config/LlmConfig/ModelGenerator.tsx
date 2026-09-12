import type { JSX } from "react/jsx-runtime";
import { Pills } from "../../../lib";
import type { OutputProps } from "./Types";
import { useState } from "react";
import OpenAiOutput from "./OpenAiOutput";
import OllamaOutput from "./OllamaOutput";

export default function ModelGenerator({
  configData,
  fullSystemPrompt,
}: OutputProps): JSX.Element {
  const [modelPills, setModelPills] = useState<
    { id: string; label: string; selected: boolean }[]
  >([
    { id: "ollama", label: "Ollama", selected: true },
    { id: "openai", label: "openai", selected: false },
  ]);

  const modelPillSelect = (clickedId: string | number) => {
    setModelPills((prev) =>
      prev.map((item) => ({ ...item, selected: item.id === clickedId })),
    );
  };

  const selectedModel = modelPills.find((pill) => pill.selected === true);
  return (
    <>
      <p>
        <strong>**WARNING:**</strong> Context stuffing can be detrimental as the
        library instructions are being sent along with every query. If you have
        a lot of memory this is not big deal. If memory is an issue id recommend
        you make a dedicated Library LLM for UI work, and use other agents for
        other stuff.
      </p>
      <Pills items={modelPills} onChange={modelPillSelect} position="center" />
      {selectedModel?.id === "openai" && (
        <OpenAiOutput
          configData={configData}
          fullSystemPrompt={fullSystemPrompt}
        />
      )}
      {selectedModel?.id === "ollama" && (
        <OllamaOutput
          configData={configData}
          fullSystemPrompt={fullSystemPrompt}
        />
      )}
    </>
  );
}
