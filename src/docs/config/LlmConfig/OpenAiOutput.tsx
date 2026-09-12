import type { JSX } from "react/jsx-runtime";
import type { OutputProps } from "./Types";
import { SyntaxHighlighter } from "storybook/internal/components";
import ModelControls from "./ModelControls";
import { useState } from "react";

export default function OpenAiOutput({
  configData,
  fullSystemPrompt,
}: OutputProps): JSX.Element {
  const [modelName, setModelName] = useState<string>(configData.baseModel);
  const [temperature, setTemperature] = useState<number>(
    configData.parameters.temperature,
  );
  const [topP, setTopP] = useState<number>(configData.parameters.top_p);

  const code = JSON.stringify(
    {
      model: modelName,
      temperature: temperature,
      top_p: topP,
      messages: [
        {
          role: "system",
          content: fullSystemPrompt,
        },
      ],
    },
    null,
    2,
  );

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
      <SyntaxHighlighter language="json" bordered={true} copyable format={true}>
        {code}
      </SyntaxHighlighter>
    </>
  );
}
