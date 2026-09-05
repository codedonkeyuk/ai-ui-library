import { test } from "node:test";
import assert from "node:assert";
import { render, screen } from "@testing-library/react";
import OllamaOutput from "./OllamaOutput";
import { type OutputProps } from "./Types";

test("OllamaOutput renders the correct formatted configuration string", () => {
  const props: OutputProps = {
    modelName: "llama3",
    temperature: 0.7,
    topP: 0.9,
    fullSystemPrompt: "SYSTEM PROMPT",
    configData: {
      parameters: {
        temperature: 0.7,
        top_p: 0.9,
        stop: "\\n",
      },
      baseModel: "base-model-id",
      systemSettings: "",
      componentInventory: "",
    },
  };

  render(<OllamaOutput {...props} />);

  const preElement = screen.getByText(/FROM llama3/i);
  const content = preElement.textContent;

  const expected = `FROM llama3
PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER stop "\\n"
SYSTEM """
SYSTEM PROMPT
"""`;

  assert.strictEqual(
    content,
    expected,
    "The output string must exactly match the required format",
  );
});
