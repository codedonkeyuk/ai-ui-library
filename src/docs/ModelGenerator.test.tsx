import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import ModelGenerator from "./ModelGenerator";

const configUrl = "/test-model-config.json";
const config = {
  baseModel: "llama3.2",
  parameters: { temperature: 0.3, top_p: 0.9, stop: "" },
  systemSettings: "You are a helpful assistant.",
  componentInventory: "[]",
};

describe("ModelGenerator Tests", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    cleanup();
    globalThis.fetch = originalFetch;
  });

  it("shows a loading message before the configuration is loaded", () => {
    globalThis.fetch = async () => new Promise(() => {});
    render(<ModelGenerator configUrl={configUrl} />);
    assert.equal(
      screen.getByText("Loading file configuration...").textContent,
      "Loading file configuration...",
    );
  });

  it("loads and displays the model configuration", async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify(config), { status: 200 });
    render(<ModelGenerator configUrl={configUrl} />);

    const modelInput = await screen.findByDisplayValue("llama3.2");
    assert.ok(modelInput);

    assert.equal(
      (screen.getByDisplayValue("0.3") as HTMLInputElement).value,
      "0.3",
    );
    assert.equal(
      (screen.getByDisplayValue("0.9") as HTMLInputElement).value,
      "0.9",
    );
  });

  it("updates the model name", async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify(config), { status: 200 });
    render(<ModelGenerator configUrl={configUrl} />);

    const modelInput = await screen.findByDisplayValue("llama3.2");
    fireEvent.change(modelInput, { target: { value: "mistral" } });

    assert.equal(
      (screen.getByDisplayValue("mistral") as HTMLInputElement).value,
      "mistral",
    );
  });

  it("updates temperature and top-p values", async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify(config), { status: 200 });
    render(<ModelGenerator configUrl={configUrl} />);

    const tempInput = await screen.findByDisplayValue("0.3");
    const topPInput = screen.getByDisplayValue("0.9");

    fireEvent.change(tempInput, { target: { value: "0.7" } });
    fireEvent.change(topPInput, { target: { value: "0.8" } });

    assert.equal((tempInput as HTMLInputElement).value, "0.7");
    assert.equal((topPInput as HTMLInputElement).value, "0.8");
  });

  it("renders the Ollama output by default", async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify(config), { status: 200 });
    render(<ModelGenerator configUrl={configUrl} />);

    await screen.findByDisplayValue("llama3.2");

    assert.ok(screen.getByText(/FROM llama3.2/));
  });

  it("switches to the OpenAI output when the OpenAI pill is selected", async () => {
    globalThis.fetch = async () =>
      new Response(JSON.stringify(config), { status: 200 });
    render(<ModelGenerator configUrl={configUrl} />);

    await screen.findByDisplayValue("llama3.2");

    const openAiButton = screen.getByRole("button", { name: /openai/i });
    fireEvent.click(openAiButton);

    await waitFor(() => {
      assert.equal(openAiButton.getAttribute("aria-pressed"), "true");
    });
  });

  it("displays an error when fetching the configuration fails", async () => {
    globalThis.fetch = async () =>
      new Response(null, { status: 404, statusText: "Not Found" });
    render(<ModelGenerator configUrl={configUrl} />);

    await waitFor(() => {
      assert.ok(screen.getByText("Error: Failed to load file: Not Found"));
    });
  });

  it("displays an error when fetch rejects", async () => {
    globalThis.fetch = async () => {
      throw new Error("Network failure");
    };
    render(<ModelGenerator configUrl={configUrl} />);

    await waitFor(() => {
      assert.ok(screen.getByText("Error: Network failure"));
    });
  });
});
