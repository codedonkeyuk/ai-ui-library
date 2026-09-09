import { test, afterEach, mock, before, describe, beforeEach } from "node:test";
import assert from "node:assert";
import { cleanup, screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

mock.module("./OpenAiOutput.tsx", {
  defaultExport: function MockOpenAiOutput(props: any) {
    return (
      <div data-testid="mock-openai-output">
        <span data-testid="mock-model">{props.modelName}</span>
        <span data-testid="mock-temp">{props.temperature}</span>
        <span data-testid="mock-topp">{props.topP}</span>
      </div>
    );
  },
});

mock.module("./OllamaOutput.tsx", {
  defaultExport: function MockOllamaOutput(props: any) {
    return (
      <div data-testid="mock-ollama-output">
        <span data-testid="mock-model">{props.modelName}</span>
        <span data-testid="mock-temp">{props.temperature}</span>
        <span data-testid="mock-topp">{props.topP}</span>
      </div>
    );
  },
});

const fetchData = {
  baseModel: "qwen2.5-coder:3b",
  parameters: { temperature: 0.3, top_p: 0.9, stop: "[SUCCESS]" },
  systemSettings: "...",
  componentInventory: "...",
};

let ModelGenerator: React.ComponentType<any>;

before(async () => {
  mock.method(globalThis, "fetch", async () => {
    return {
      ok: true,
      json: async () => fetchData,
    };
  });

  const module = await import("./ModelGenerator.tsx");
  ModelGenerator = module.default;
});

describe("Test component in ollama mode", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(async () => {
    render(<ModelGenerator configUrl="/model-config.json" />);
    assert.ok(screen.getByText(/Loading file configuration/i));

    const modelOutput = await screen.findByTestId("mock-ollama-output");
    assert.ok(modelOutput);
  });

  test("Test initial render", () => {
    const modelLabel = screen.getByText("Base Model");
    const modelInput = modelLabel.parentElement?.querySelector(
      "input",
    ) as HTMLInputElement;
    assert.ok(modelInput, "Base Model input should exist");
    assert.strictEqual(modelInput.value, "qwen2.5-coder:3b");

    const tempLabel = screen.getByText("Temperature");
    const tempInput = tempLabel.parentElement?.querySelector(
      "input",
    ) as HTMLInputElement;
    assert.ok(tempInput, "Temperature input should exist");
    assert.strictEqual(tempInput.value, "0.3");

    const topPLabel = screen.getByText("Top P");
    const topPInput = topPLabel.parentElement?.querySelector(
      "input",
    ) as HTMLInputElement;
    assert.ok(topPInput, "Top P input should exist");
    assert.strictEqual(topPInput.value, "0.9");

    const modelSpan = screen.getByTestId("mock-model");
    const tempSpan = screen.getByTestId("mock-temp");
    const topPSpan = screen.getByTestId("mock-topp");

    assert.strictEqual(modelSpan.textContent, "qwen2.5-coder:3b");
    assert.strictEqual(tempSpan.textContent, "0.3");
    assert.strictEqual(topPSpan.textContent, "0.9");
  });

  test("Test input changes", async () => {
    const user = userEvent.setup();

    const modelLabel = screen.getByText("Base Model");
    const modelInput = modelLabel.parentElement?.querySelector(
      "input",
    ) as HTMLInputElement;
    const tempLabel = screen.getByText("Temperature");
    const tempInput = tempLabel.parentElement?.querySelector(
      "input",
    ) as HTMLInputElement;
    const topPLabel = screen.getByText("Top P");
    const topPInput = topPLabel.parentElement?.querySelector(
      "input",
    ) as HTMLInputElement;

    await user.clear(modelInput);
    await user.type(modelInput, "llama3");
    assert.strictEqual(modelInput.value, "llama3");

    await user.clear(tempInput);
    await user.type(tempInput, "0.5");
    assert.strictEqual(tempInput.value, "0.5");

    await user.clear(topPInput);
    await user.type(topPInput, "0.7");
    assert.strictEqual(topPInput.value, "0.7");

    const modelSpan = screen.getByTestId("mock-model");
    const tempSpan = screen.getByTestId("mock-temp");
    const topPSpan = screen.getByTestId("mock-topp");

    assert.strictEqual(modelSpan.textContent, "llama3");
    assert.strictEqual(tempSpan.textContent, "0.5");
    assert.strictEqual(topPSpan.textContent, "0.7");
  });
});

describe("Test component in open ai  mode", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(async () => {
    const user = userEvent.setup();

    render(<ModelGenerator configUrl="/model-config.json" />);
    assert.ok(screen.getByText(/Loading file configuration/i));

    const modelOutput = await screen.findByTestId("mock-ollama-output");
    assert.ok(modelOutput);

    const openAiButton = await screen.findByRole("button", { name: /openai/i });

    await user.click(openAiButton);

    const newModelOutput = await screen.findByTestId("mock-openai-output");
    assert.ok(newModelOutput);
  });

  test("Initial render, after open AI selection", async () => {
    const modelSpan = screen.getByTestId("mock-model");
    const tempSpan = screen.getByTestId("mock-temp");
    const topPSpan = screen.getByTestId("mock-topp");

    assert.strictEqual(modelSpan.textContent, "qwen2.5-coder:3b");
    assert.strictEqual(tempSpan.textContent, "0.3");
    assert.strictEqual(topPSpan.textContent, "0.9");
  });
  test("Test input changes", async () => {
    const user = userEvent.setup();

    const modelLabel = screen.getByText("Base Model");
    const modelInput = modelLabel.parentElement?.querySelector(
      "input",
    ) as HTMLInputElement;
    const tempLabel = screen.getByText("Temperature");
    const tempInput = tempLabel.parentElement?.querySelector(
      "input",
    ) as HTMLInputElement;
    const topPLabel = screen.getByText("Top P");
    const topPInput = topPLabel.parentElement?.querySelector(
      "input",
    ) as HTMLInputElement;

    await user.clear(modelInput);
    await user.type(modelInput, "llama3");
    assert.strictEqual(modelInput.value, "llama3");

    await user.clear(tempInput);
    await user.type(tempInput, "0.5");
    assert.strictEqual(tempInput.value, "0.5");

    await user.clear(topPInput);
    await user.type(topPInput, "0.7");
    assert.strictEqual(topPInput.value, "0.7");

    const modelSpan = screen.getByTestId("mock-model");
    const tempSpan = screen.getByTestId("mock-temp");
    const topPSpan = screen.getByTestId("mock-topp");

    assert.strictEqual(modelSpan.textContent, "llama3");
    assert.strictEqual(tempSpan.textContent, "0.5");
    assert.strictEqual(topPSpan.textContent, "0.7");
  });
});

describe("Test component error state", () => {
  afterEach(() => {
    cleanup();
    mock.restoreAll();
  });

  test("Should display error message if the fetch configuration fails", async () => {
    mock.method(globalThis, "fetch", async () => {
      return {
        ok: false,
        statusText: "Internal Server Error",
      };
    });

    render(<ModelGenerator configUrl="/model-config.json" />);
    assert.ok(screen.getByText(/Loading file configuration/i));

    const errorHeading = await screen.findByRole("heading", { level: 1 });

    assert.ok(errorHeading, "Error heading should exist");
    assert.strictEqual(
      errorHeading.textContent,
      "Error: Failed to load file: Internal Server Error",
    );
  });
});
