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

const { default: OpenAiOutput } = await import("./OpenAiOutput");

const mockProps: OutputProps = {
  configData: {
    baseModel: "gpt-4o",
    parameters: {
      temperature: 0.7,
      top_p: 0.9,
      stop: "STOP",
    },
    systemSettings: "System settings content",
    componentInventory: "Component code definitions",
  },
  fullSystemPrompt: "Full formatted system prompt text",
};

describe("OpenAiOutput", () => {
  afterEach(() => {
    cleanup();
    receivedControlsProps = null;
    receivedCodeBlockProps = null;
  });

  it("generates correct JSON layout payload from initial props", () => {
    render(<OpenAiOutput {...mockProps} />);

    assert.ok(screen.getByTestId("spy-controls"));
    assert.ok(screen.getByTestId("spy-code-block"));

    assert.ok(receivedCodeBlockProps);
    const parsedJson = JSON.parse(receivedCodeBlockProps.code);

    assert.equal(parsedJson.model, "gpt-4o");
    assert.equal(parsedJson.temperature, 0.7);
    assert.equal(parsedJson.top_p, 0.9);
    assert.equal(parsedJson.messages[0].role, "system");
    assert.equal(parsedJson.messages[0].content, mockProps.fullSystemPrompt);
  });

  it("regenerates code string when parent callback handlers trigger", () => {
    render(<OpenAiOutput {...mockProps} />);

    assert.ok(receivedControlsProps);

    act(() => {
      receivedControlsProps.onModelNameChange("o1-preview");
      receivedControlsProps.onTemperatureChange(0.1);
    });

    const updatedJson = JSON.parse(receivedCodeBlockProps.code);
    assert.equal(updatedJson.model, "o1-preview");
    assert.equal(updatedJson.temperature, 0.1);
    assert.equal(updatedJson.top_p, 0.9);
  });
});
