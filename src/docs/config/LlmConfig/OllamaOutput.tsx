import type { JSX } from "react/jsx-runtime";
import type { OutputProps } from "./Types";
import { useState } from "react";
import ModelControls from "./ModelControls";
import CodeBlock from "../common/CodeBlock";

export default function OllamaOutput({
  configData,
  fullSystemPrompt,
}: OutputProps): JSX.Element {
  const [modelName, setModelName] = useState<string>(configData.baseModel);
  const [temperature, setTemperature] = useState<number>(
    configData.parameters.temperature,
  );
  const [topP, setTopP] = useState<number>(configData.parameters.top_p);

  const code = `FROM ${modelName}
PARAMETER temperature ${temperature}
PARAMETER top_p ${topP}
PARAMETER stop "${configData.parameters.stop}"
SYSTEM """
${fullSystemPrompt}
"""`;

  return (
    <>
      <ModelControls
        modelName={modelName}
        temperature={temperature}
        topP={topP}
        onModelNameChange={setModelName}
        onTemperatureChange={setTemperature}
        onTopPChange={setTopP}
      />
      <CodeBlock code={code} />
    </>
  );
}
