import { test } from "node:test";
import assert from "node:assert";
import React from "react";
import { createRoot } from "react-dom/client";
import GlobalStyle from "./GlobalStyle.js";

test("GlobalStyle exports and mounts without throwing errors", async (t) => {
  await t.test("should successfully export the component", () => {
    assert.notStrictEqual(
      GlobalStyle,
      undefined,
      "GlobalStyle should be exported",
    );
  });

  await t.test("should load and render into the DOM context", async () => {
    const { Window } = await import("happy-dom");
    const windowContext = new Window();
    const documentContext = windowContext.document;

    (globalThis as any).window = windowContext;
    (globalThis as any).document = documentContext;

    const container = documentContext.createElement("div");
    documentContext.body.appendChild(container);

    const root = createRoot(container as any);

    assert.doesNotThrow(() => {
      root.render(React.createElement(GlobalStyle));
    }, "Rendering GlobalStyle should not throw runtime errors");

    root.unmount();
    documentContext.body.removeChild(container);
    (globalThis as any).window = undefined;
    (globalThis as any).document = undefined;
  });
});
