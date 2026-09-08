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

test("renders correctly formatted OpenAI JSON configuration within SyntaxHighlighter", async () => {
  const { default: OpenAiOutput } = await import("./OpenAiOutput.tsx");

  const mockProps = {
    modelName: "gpt-4o-test",
    temperature: 0.2,
    topP: 0.9,
    fullSystemPrompt: "SYSTEM_INSTRUCTIONS_HERE",
    configData: {
      baseModel: "gpt-4o-test",
      parameters: {
        temperature: 0.2,
        top_p: 0.9,
        stop: "",
      },
      systemSettings: "...",
      componentInventory: "[]",
    },
  };

  root.render(React.createElement(OpenAiOutput, mockProps));
  await flushMacroTasks();

  const highlighter = container!.querySelector(
    '[data-testid="syntax-highlighter-mock"]',
  );
  assert.ok(highlighter, "SyntaxHighlighter should be present in the document");
  assert.strictEqual(highlighter.getAttribute("data-language"), "json");

  const expectedJson = {
    model: "gpt-4o-test",
    temperature: 0.2,
    top_p: 0.9,
    messages: [
      {
        role: "system",
        content: "SYSTEM_INSTRUCTIONS_HERE",
      },
    ],
  };

  const parsedOutput = JSON.parse(highlighter.textContent || "{}");
  assert.deepStrictEqual(parsedOutput, expectedJson);
});
