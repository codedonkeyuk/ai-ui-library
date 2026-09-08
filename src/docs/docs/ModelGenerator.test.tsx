import { test, beforeEach, afterEach, mock } from "node:test";
import assert from "node:assert";
import React from "react";
import { createRoot } from "react-dom/client";

mock.module("../../lib/index.ts", {
  namedExports: {
    Input: ({ label, value, onChange }: any) =>
      React.createElement("input", {
        "data-testid": `input-${label.toLowerCase().replace(/\s+/g, "-")}`,
        value,
        onChange,
      }),
  },
});

mock.module("../../lib/components/Pills.tsx", {
  defaultExport: ({ items, onChange }: any) =>
    React.createElement(
      "div",
      { "data-testid": "pills-mock" },
      items.map((item: any) =>
        React.createElement(
          "button",
          {
            key: item.id,
            "data-testid": `pill-${item.id}`,
            "data-selected": item.selected,
            onClick: () => onChange(item.id),
          },
          item.label,
        ),
      ),
    ),
});

mock.module("./OpenAiOutput.tsx", {
  defaultExport: () =>
    React.createElement(
      "div",
      { "data-testid": "openai-output" },
      "OPENAI_MOCK",
    ),
});

mock.module("./OllamaOutput.tsx", {
  defaultExport: () =>
    React.createElement(
      "div",
      { "data-testid": "ollama-output" },
      "OLLAMA_MOCK",
    ),
});

mock.module("../../lib/styles/global/GlobalStyle.tsx", {
  defaultExport: () =>
    React.createElement("div", {
      "data-testid": "global-style",
    }),
});

const mockConfigPayload = {
  baseModel: "test-model",
  parameters: {
    temperature: 0.5,
    top_p: 0.85,
    stop: "[STOP]",
  },
  systemSettings: "SYSTEM_RULES",
  componentInventory: JSON.stringify([
    {
      component: "Button",
      props: {
        label: {
          type: "string",
          required: true,
        },
      },
    },
  ]),
};

async function waitFor(
  predicate: () => boolean,
  timeout = 1000,
): Promise<void> {
  const start = Date.now();

  while (!predicate()) {
    if (Date.now() - start >= timeout) {
      throw new Error(
        `Timed out waiting for condition.\nDOM:\n${document.body.innerHTML}`,
      );
    }

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 5);
    });
  }
}

let container: HTMLDivElement | null = null;
let root: ReturnType<typeof createRoot> | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  root?.unmount();
  container?.remove();

  root = null;
  container = null;

  // Restore fetch and other function mocks.
  mock.restoreAll();
});

test("shows loading state initially and renders data after successful fetch", async () => {
  const { default: ModelGenerator } = await import("./ModelGenerator.tsx");

  let resolveFetch!: (value: unknown) => void;

  const fetchPromise = new Promise((resolve) => {
    resolveFetch = resolve;
  });

  mock.method(globalThis, "fetch", () => fetchPromise);

  root!.render(
    React.createElement(ModelGenerator, {
      configUrl: "http://api/config",
    }),
  );

  await waitFor(
    () =>
      container!.textContent?.includes("Loading file configuration...") ===
      true,
  );

  assert.match(
    container!.textContent ?? "",
    /Loading file configuration\.\.\./,
  );

  resolveFetch({
    ok: true,
    json: async () => mockConfigPayload,
  });

  await waitFor(() =>
    Boolean(container!.querySelector('[data-testid="ollama-output"]')),
  );

  const modelInput = container!.querySelector(
    '[data-testid="input-base-model"]',
  ) as HTMLInputElement | null;

  assert.ok(modelInput);
  assert.strictEqual(modelInput.value, "test-model");
});

test("shows error message if fetch requests fail", async () => {
  const { default: ModelGenerator } = await import("./ModelGenerator.tsx");

  mock.method(globalThis, "fetch", async () => ({
    ok: false,
    statusText: "Internal Server Error",
  }));

  root!.render(
    React.createElement(ModelGenerator, {
      configUrl: "http://api/config",
    }),
  );

  await waitFor(
    () =>
      container!.textContent?.includes(
        "Error: Failed to load file: Internal Server Error",
      ) === true,
  );

  assert.match(
    container!.textContent ?? "",
    /Error: Failed to load file: Internal Server Error/,
  );
});

test("switches output panel when changing pills configuration", async () => {
  const { default: ModelGenerator } = await import("./ModelGenerator.tsx");

  mock.method(globalThis, "fetch", async () => ({
    ok: true,
    json: async () => mockConfigPayload,
  }));

  root!.render(
    React.createElement(ModelGenerator, {
      configUrl: "http://api/config",
    }),
  );

  await waitFor(() =>
    Boolean(container!.querySelector('[data-testid="ollama-output"]')),
  );

  const openAiPill = container!.querySelector(
    '[data-testid="pill-openai"]',
  ) as HTMLButtonElement | null;

  assert.ok(openAiPill);

  openAiPill.click();

  await waitFor(() =>
    Boolean(container!.querySelector('[data-testid="openai-output"]')),
  );

  assert.ok(container!.querySelector('[data-testid="openai-output"]'));
  assert.equal(container!.querySelector('[data-testid="ollama-output"]'), null);
});
