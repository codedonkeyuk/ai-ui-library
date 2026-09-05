import { test } from "node:test";
import assert from "node:assert";
import { render, screen } from "@testing-library/react";
import OpenAiOutput from "./OpenAiOutput.tsx";
import { type OutputProps } from "./Types.ts";

test("OpenAiOutput renders the correctly formatted JSON string", () => {
  const props: OutputProps = {
    modelName: "gpt-4",
    temperature: 0.7,
    topP: 0.9,
    fullSystemPrompt: "SYSTEM PROMPT",
    configData: {
      parameters: {
        temperature: 0.7,
        top_p: 0.9,
        stop: "\n",
      },
      baseModel: "gpt-4",
      systemSettings: "",
      componentInventory: "",
    },
  };

  render(<OpenAiOutput {...props} />);

  const preElement = screen.getByText(/gpt-4/);
  const content = preElement.textContent;

  const expected = JSON.stringify(
    {
      model: "gpt-4",
      temperature: 0.7,
      top_p: 0.9,
      messages: [
        {
          role: "system",
          content: "SYSTEM PROMPT",
        },
      ],
    },
    null,
    2,
  );

  assert.strictEqual(
    content,
    expected,
    "The JSON output must match the expected structure and indentation",
  );
});
