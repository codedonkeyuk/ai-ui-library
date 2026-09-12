import { afterEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { cleanup, render, screen, act } from "@testing-library/react";
import type { OutputProps } from "./Types";

let receivedControlsProps: any = null;
let receivedCodeBlockProps: any = null;

mock.module("./ModelControls", {
  namedExports: {
    default: function MockModelControls(props: any) {
      receivedControlsProps = props;
      return <div data-testid="spy-controls" />;
    },
  },
});

mock.module("../common/CodeBlock", {
  namedExports: {
    default: function MockCodeBlock(props: any) {
      receivedCodeBlockProps = props;
      return <div data-testid="spy-code-block" />;
    },
  },
});

mock.module("storybook/internal/components", {
  namedExports: {
    Form: {
      Field: ({ children }: any) => (
        <div data-testid="sb-field">{children}</div>
      ),
      Input: (props: any) => <input data-testid="sb-input" {...props} />,
    },
    Button: ({ children }: any) => <button>{children}</button>,
    SyntaxHighlighter: ({ children }: any) => <pre>{children}</pre>,
  },
});

const { default: OllamaOutput } = await import("./OllamaOutput");

const mockProps: OutputProps = {
  configData: {
    baseModel: "llama3",
    parameters: {
      temperature: 0.7,
      top_p: 0.9,
      stop: "STOP_TOKEN",
    },
    systemSettings: "System settings content",
    componentInventory: "Component code definitions",
  },
  fullSystemPrompt: "Full formatted system prompt text",
};

describe("OllamaOutput", () => {
  afterEach(() => {
    cleanup();
    receivedControlsProps = null;
    receivedCodeBlockProps = null;
  });

  it("generates correct Modelfile text block structure from initial props", () => {
    render(<OllamaOutput {...mockProps} />);

    assert.ok(screen.getByTestId("spy-controls"));
    assert.ok(screen.getByTestId("spy-code-block"));

    assert.ok(receivedCodeBlockProps);
    const generatedCode = receivedCodeBlockProps.code;

    assert.ok(generatedCode.includes("FROM llama3"));
    assert.ok(generatedCode.includes("PARAMETER temperature 0.7"));
    assert.ok(generatedCode.includes("PARAMETER top_p 0.9"));
    assert.ok(generatedCode.includes('PARAMETER stop "STOP_TOKEN"'));
    assert.ok(
      generatedCode.includes(
        'SYSTEM """\nFull formatted system prompt text\n"""',
      ),
    );
  });

  it("regenerates the custom Modelfile instructions string when callbacks execute transformations", () => {
    render(<OllamaOutput {...mockProps} />);

    assert.ok(receivedControlsProps);

    act(() => {
      receivedControlsProps.onModelNameChange("mistral");
      receivedControlsProps.onTemperatureChange(0.3);
    });

    const updatedCode = receivedCodeBlockProps.code;

    assert.ok(updatedCode.includes("FROM mistral"));
    assert.ok(updatedCode.includes("PARAMETER temperature 0.3"));
    assert.ok(updatedCode.includes("PARAMETER top_p 0.9"));
  });
});
