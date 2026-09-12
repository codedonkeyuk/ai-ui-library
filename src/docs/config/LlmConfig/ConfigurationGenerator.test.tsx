import { afterEach, beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import {
  cleanup,
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";

let receivedAgentsProps: any = null;
let receivedModelsProps: any = null;

mock.module("./AgentsMdOutput.tsx", {
  namedExports: {
    default: function MockAgentsMdOutput(props: any) {
      receivedAgentsProps = props;
      return <div data-testid="spy-agents-output" />;
    },
  },
});

mock.module("./ModelGenerator.tsx", {
  namedExports: {
    default: function MockModelGenerator(props: any) {
      receivedModelsProps = props;
      return <div data-testid="spy-models-output" />;
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

const { default: ConfigurationGenerator } =
  await import("./ConfigurationGenerator");

const mockPayload = {
  baseModel: "gpt-4o",
  parameters: {
    temperature: 0.7,
    top_p: 0.9,
    stop: "STOP",
  },
  systemSettings: "  System settings rule baseline.  ",
  componentInventory: "  export const UI = () => {};  ",
};

describe("ConfigurationGenerator", () => {
  let originalFetch: typeof fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    cleanup();
    globalThis.fetch = originalFetch;
    receivedAgentsProps = null;
    receivedModelsProps = null;
  });

  it("renders a loading header placeholder state while network stream executes", async () => {
    globalThis.fetch = () => new Promise(() => {});

    render(<ConfigurationGenerator configUrl="http://api.local" />);
    assert.ok(
      screen.getByRole("heading", { name: "Loading file configuration..." }),
    );
  });

  it("renders error header if endpoint fetch signals a failure layout code", async () => {
    globalThis.fetch = mock.fn(
      async () =>
        ({
          ok: false,
          statusText: "Internal Server Error",
        }) as Response,
    );

    render(<ConfigurationGenerator configUrl="http://api.local" />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    assert.ok(
      screen.getByRole("heading", {
        name: "Error: Failed to load file: Internal Server Error",
      }),
    );
  });

  it("loads content payload successfully, parses configuration variables, and handles view tabs switching", async () => {
    globalThis.fetch = mock.fn(
      async () =>
        ({
          ok: true,
          json: async () => mockPayload,
        }) as Response,
    );

    render(<ConfigurationGenerator configUrl="http://api.local" />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const agentsBtn = screen.getByRole("button", { name: "AGENTS.md" });
    const modelsBtn = screen.getByRole("button", { name: "Models" });

    assert.equal(agentsBtn.getAttribute("data-variant"), "solid");
    assert.equal(modelsBtn.getAttribute("data-variant"), "outline");
    assert.ok(screen.getByTestId("spy-agents-output"));

    assert.ok(receivedAgentsProps);
    assert.equal(
      receivedAgentsProps.fullSystemPrompt,
      "System settings rule baseline.\n\n## AVAILABLE COMPONENTS INVENTORY (TYPESCRIPT DEFINITIONS)\nexport const UI = () => {};",
    );

    fireEvent.click(modelsBtn);

    assert.equal(agentsBtn.getAttribute("data-variant"), "outline");
    assert.equal(modelsBtn.getAttribute("data-variant"), "solid");
    assert.ok(screen.getByTestId("spy-models-output"));
    assert.equal(receivedModelsProps.configData.baseModel, "gpt-4o");
  });
});
