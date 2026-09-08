import type { JSX } from "react/jsx-runtime";
import type { OutputProps } from "./Types";
import { SyntaxHighlighter } from "storybook/internal/components";

export default function OllamaOutput({
  modelName,
  configData,
  temperature,
  topP,
  fullSystemPrompt,
}: OutputProps): JSX.Element {
  const code = `FROM ${modelName}
PARAMETER temperature ${temperature}
PARAMETER top_p ${topP}
PARAMETER stop "${configData.parameters.stop}"
SYSTEM """
${fullSystemPrompt}
"""`;

  return (
    <SyntaxHighlighter language="json" bordered={true} copyable format={true}>
      {code}
    </SyntaxHighlighter>
  );
}
