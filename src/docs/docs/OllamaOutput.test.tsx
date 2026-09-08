import { test, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert";
import React from "react";
import { createRoot } from "react-dom/client";

mock.module("storybook/internal/components", {
  namedExports: {
    SyntaxHighlighter: ({ language, children }: any) =>
      React.createElement(
        "div",
        {
          "data-testid": "syntax-highlighter-mock",
          "data-language": language,
        },
        children,
      ),
  },
});

const flushMacroTasks = () => new Promise((resolve) => setTimeout(resolve, 10));

let container: HTMLDivElement | null = null;
let root: any = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  if (root) root.unmount();
  if (container) container.remove();
  document.body.innerHTML = "";
  mock.reset();
});

test("renders formatted Modelfile code content within SyntaxHighlighter", async () => {
  const { default: OllamaOutput } = await import("./OllamaOutput.tsx");

  const mockProps = {
    modelName: "llama3-test",
    temperature: 0.7,
    topP: 0.95,
    fullSystemPrompt: "YOU_ARE_AN_AI_ASSISTANT",
    configData: {
      baseModel: "llama3-test",
      parameters: {
        temperature: 0.7,
        top_p: 0.95,
        stop: "[END]",
      },
      systemSettings: "...",
      componentInventory: "[]",
    },
  };

  root.render(React.createElement(OllamaOutput, mockProps));
  await flushMacroTasks();

  const highlighter = container!.querySelector(
    '[data-testid="syntax-highlighter-mock"]',
  );
  assert.ok(highlighter, "SyntaxHighlighter should be present in the document");
  assert.strictEqual(highlighter.getAttribute("data-language"), "json");

  const expectedText = `FROM llama3-test
PARAMETER temperature 0.7
PARAMETER top_p 0.95
PARAMETER stop "[END]"
SYSTEM """
YOU_ARE_AN_AI_ASSISTANT
"""`;

  assert.strictEqual(highlighter.textContent?.trim(), expectedText.trim());
});
