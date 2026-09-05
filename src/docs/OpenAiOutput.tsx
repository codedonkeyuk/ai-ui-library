import type { JSX } from "react/jsx-runtime";
import type { OutputProps } from "./Types";

export default function OpenAiOutput({
  modelName,
  temperature,
  topP,
  fullSystemPrompt,
}: OutputProps): JSX.Element {
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
  return <pre>{code}</pre>;
}
