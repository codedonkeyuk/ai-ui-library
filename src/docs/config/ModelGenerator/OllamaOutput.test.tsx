import { test, mock, before, afterEach } from "node:test";
import assert from "node:assert";
import { cleanup, screen, render } from "@testing-library/react";

mock.module("storybook/internal/components", {
  namedExports: {
    SyntaxHighlighter: function MockSyntaxHighlighter(props: any) {
      return (
        <div
          data-testid="mock-syntax-highlighter"
          data-language={props.language}
        >
          <pre data-testid="highlighter-content">{props.children}</pre>
        </div>
      );
    },
  },
});

const mockConfigData = {
  baseModel: "qwen2.5-coder:3b",
  parameters: { temperature: 0.3, top_p: 0.9, stop: "[SUCCESS]" },
  systemSettings: "You are an expert engineer.",
  componentInventory: "export { Button };",
};

let OllamaOutput: React.ComponentType<any>;

before(async () => {
  const module = await import("./OllamaOutput.tsx");
  OllamaOutput = module.default;
});

afterEach(() => {
  cleanup();
});

test("OllamaOutput renders correctly formatted model configuration block", () => {
  const props = {
    modelName: "qwen2.5-coder:3b",
    configData: mockConfigData,
    temperature: 0.3,
    topP: 0.9,
    fullSystemPrompt:
      "You are an expert engineer.\n\n## AVAILABLE COMPONENTS INVENTORY\nexport { Button };",
  };

  render(<OllamaOutput {...props} />);

  const highlighterWrapper = screen.getByTestId("mock-syntax-highlighter");
  assert.ok(highlighterWrapper, "SyntaxHighlighter mock wrapper should render");
  assert.strictEqual(highlighterWrapper.getAttribute("data-language"), "json");

  const contentElement = screen.getByTestId("highlighter-content");
  assert.ok(contentElement, "Internal code text block should render");

  const expectedCodeTemplate = `FROM qwen2.5-coder:3b
PARAMETER temperature 0.3
PARAMETER top_p 0.9
PARAMETER stop "[SUCCESS]"
SYSTEM """
You are an expert engineer.

## AVAILABLE COMPONENTS INVENTORY
export { Button };
"""`;

  assert.strictEqual(contentElement.textContent, expectedCodeTemplate);
});
