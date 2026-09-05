import type { JSX } from "react/jsx-runtime";
import type { OutputProps } from "./Types";
import { SyntaxHighlighter } from "storybook/internal/components";

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
  return (
    <SyntaxHighlighter language="json" bordered={true} copyable format={true}>
      {code}
    </SyntaxHighlighter>
  );
}
