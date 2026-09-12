import { afterEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import type { OutputProps } from "./Types";

let receivedOpenAiProps: any = null;
let receivedOllamaProps: any = null;

mock.module("./OpenAiOutput", {
  namedExports: {
    default: function MockOpenAiOutput(props: any) {
      receivedOpenAiProps = props;
      return <div data-testid="spy-openai-output" />;
    },
  },
});

mock.module("./OllamaOutput", {
  namedExports: {
    default: function MockOllamaOutput(props: any) {
      receivedOllamaProps = props;
      return <div data-testid="spy-ollama-output" />;
    },
  },
});

mock.module("storybook/internal/components", {
  namedExports: {
    Button: ({ children, variant, onClick }: any) => (
      <button data-variant={variant} onClick={onClick}>
        {children}
      </button>
    ),
  },
});

const { default: ModelGenerator } = await import("./ModelGenerator");

const mockProps: OutputProps = {
  configData: {
    baseModel: "gpt-4o",
    parameters: {
      temperature: 0.7,
      top_p: 0.9,
      stop: "STOP",
    },
    systemSettings: "System baseline rules",
    componentInventory: "export const Button = () => {};",
  },
  fullSystemPrompt: "Full system string block context",
};

describe("ModelGenerator", () => {
  afterEach(() => {
    cleanup();
    receivedOpenAiProps = null;
    receivedOllamaProps = null;
  });

  it("renders a warning disclaimer text block and initialises with the Ollama tab active", () => {
    render(<ModelGenerator {...mockProps} />);

    assert.ok(screen.getByText(/Context stuffing can be detrimental/));

    const ollamaBtn = screen.getByRole("button", { name: "Ollama" });
    const openAiBtn = screen.getByRole("button", { name: "OpenAI" });

    assert.equal(ollamaBtn.getAttribute("data-variant"), "solid");
    assert.equal(openAiBtn.getAttribute("data-variant"), "outline");

    assert.ok(screen.getByTestId("spy-ollama-output"));
    assert.equal(screen.queryByTestId("spy-openai-output"), null);

    assert.ok(receivedOllamaProps);
    assert.equal(
      receivedOllamaProps.fullSystemPrompt,
      "Full system string block context",
    );
  });

  it("toggles rendering blocks and passes configuration hooks correctly when the alternate tab is selected", () => {
    render(<ModelGenerator {...mockProps} />);

    const ollamaBtn = screen.getByRole("button", { name: "Ollama" });
    const openAiBtn = screen.getByRole("button", { name: "OpenAI" });

    fireEvent.click(openAiBtn);

    assert.equal(ollamaBtn.getAttribute("data-variant"), "outline");
    assert.equal(openAiBtn.getAttribute("data-variant"), "solid");

    assert.equal(screen.queryByTestId("spy-ollama-output"), null);
    assert.ok(screen.getByTestId("spy-openai-output"));

    assert.ok(receivedOpenAiProps);
    assert.equal(receivedOpenAiProps.configData.baseModel, "gpt-4o");
  });
});
