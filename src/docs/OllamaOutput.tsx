import type { JSX } from "react/jsx-runtime";
import type { OutputProps } from "./Types";

export default function OllamaOutput({
  modelName,
  configData,
  temperature,
  topP,
  fullSystemPrompt,
}: OutputProps): JSX.Element {
  const output = `FROM ${modelName}
PARAMETER temperature ${temperature}
PARAMETER top_p ${topP}
PARAMETER stop "${configData.parameters.stop}"
SYSTEM """
${fullSystemPrompt}
"""`;

  return <pre>{output}</pre>;
}
