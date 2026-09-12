import { afterEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import type { OutputProps } from "./Types";

let receivedCodeBlockProps: any = null;

mock.module("../common/CodeBlock", {
  namedExports: {
    default: function MockCodeBlock(props: any) {
      receivedCodeBlockProps = props;
      return <div data-testid="spy-code-block" />;
    },
  },
});

mock.module("../../../../package.json", {
  namedExports: {
    default: {
      peerDependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router": "^6.22.0",
        "styled-components": "^6.1.8",
      },
    },
  },
});

const { default: AgentsMdOutput } = await import("./AgentsMdOutput");

const mockProps: OutputProps = {
  configData: {
    baseModel: "gpt-4o",
    parameters: {
      temperature: 0.7,
      top_p: 0.9,
      stop: "STOP",
    },
    systemSettings: "System configurations text",
    componentInventory: "export interface ButtonProps { label: string; }",
  },
  fullSystemPrompt: "Full system string block context",
};

describe("AgentsMdOutput", () => {
  afterEach(() => {
    cleanup();
    receivedCodeBlockProps = null;
  });

  it("generates correct initial markdown structure using peer dependencies and template segments", () => {
    render(<AgentsMdOutput {...mockProps} />);

    assert.ok(screen.getByLabelText("Customize Project Commands:"));
    assert.ok(screen.getByTestId("spy-code-block"));

    assert.ok(receivedCodeBlockProps);
    const generatedMarkdown = receivedCodeBlockProps.code;

    assert.ok(generatedMarkdown.includes("# AGENTS.md"));
    assert.ok(generatedMarkdown.includes("- `react ^18.2.0`"));
    assert.ok(generatedMarkdown.includes("- `styled-components ^6.1.8`"));
    assert.ok(
      generatedMarkdown.includes(
        "export interface ButtonProps { label: string; }",
      ),
    );
    assert.ok(
      generatedMarkdown.includes(
        "npm run dev          — Start the local development server",
      ),
    );
    assert.ok(
      generatedMarkdown.includes(
        'Example of the ONLY acceptable import format: `import { Dialog, Input, InputCheckboxGroup } from "ai-ui-library";`',
      ),
    );
  });

  it("dynamically rebuilds markdown compilation stream when custom project commands text changes", () => {
    render(<AgentsMdOutput {...mockProps} />);

    const textarea = screen.getByLabelText("Customize Project Commands:");

    fireEvent.change(textarea, {
      target: { value: "npm run test:unit — custom command injection" },
    });

    assert.ok(receivedCodeBlockProps);
    const updatedMarkdown = receivedCodeBlockProps.code;

    assert.ok(
      updatedMarkdown.includes("npm run test:unit — custom command injection"),
    );
    assert.ok(
      !updatedMarkdown.includes(
        "npm run dev          — Start the local development server",
      ),
    );
  });

  it("displays placeholder message inside markdown output if custom instructions are wiped clean", () => {
    render(<AgentsMdOutput {...mockProps} />);

    const textarea = screen.getByLabelText("Customize Project Commands:");

    fireEvent.change(textarea, { target: { value: "" } });

    const updatedMarkdown = receivedCodeBlockProps.code;
    assert.ok(updatedMarkdown.includes("... add your own project commands"));
  });
});
