import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { cleanup, render, waitFor } from "@testing-library/react";

import RenderDemo from "./RenderDemo";

class MockResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

const originalResizeObserver = globalThis.ResizeObserver;

before(() => {
  globalThis.ResizeObserver =
    MockResizeObserver as unknown as typeof ResizeObserver;
});

after(() => {
  cleanup();

  Object.defineProperty(globalThis, "ResizeObserver", {
    configurable: true,
    writable: true,
    value: originalResizeObserver,
  });
});

describe("RenderDemo", () => {
  it("renders an iframe", () => {
    const { container } = render(
      <RenderDemo theme="light" generatedCss="">
        <p>Demo content</p>
      </RenderDemo>,
    );

    const iframe = container.querySelector("iframe");

    assert.ok(iframe);
    assert.equal(iframe.style.height, "300px");
  });

  it("renders children inside the iframe document", async () => {
    const { container } = render(
      <RenderDemo theme="light" generatedCss="">
        <p>Demo content</p>
      </RenderDemo>,
    );

    const iframe = container.querySelector("iframe");

    assert.ok(iframe);

    await waitFor(() => {
      assert.ok(iframe.contentDocument);

      assert.match(
        iframe.contentDocument.body.textContent ?? "",
        /Demo content/,
      );
    });
  });

  it("sets the iframe document theme", async () => {
    const { container } = render(
      <RenderDemo theme="dark" generatedCss="">
        <p>Dark demo</p>
      </RenderDemo>,
    );

    const iframe = container.querySelector("iframe");

    assert.ok(iframe);

    await waitFor(() => {
      const documentElement = iframe.contentDocument?.documentElement;

      assert.ok(documentElement);
      assert.equal(documentElement.getAttribute("data-theme"), "dark");
      assert.equal(
        documentElement.style.getPropertyValue("color-scheme"),
        "dark",
      );
    });
  });

  it("updates the iframe theme when the theme prop changes", async () => {
    const { container, rerender } = render(
      <RenderDemo theme="light" generatedCss="">
        <p>Theme demo</p>
      </RenderDemo>,
    );

    const iframe = container.querySelector("iframe");

    assert.ok(iframe);

    await waitFor(() => {
      assert.equal(
        iframe.contentDocument?.documentElement.getAttribute("data-theme"),
        "light",
      );
    });

    rerender(
      <RenderDemo theme="dark" generatedCss="">
        <p>Theme demo</p>
      </RenderDemo>,
    );

    await waitFor(() => {
      const documentElement = iframe.contentDocument?.documentElement;

      assert.ok(documentElement);
      assert.equal(documentElement.getAttribute("data-theme"), "dark");
      assert.equal(
        documentElement.style.getPropertyValue("color-scheme"),
        "dark",
      );
    });
  });

  it("adds generated CSS to the iframe document", async () => {
    const generatedCss = `
      :root {
        --main-bg-color: #ffffff;
      }
    `;

    const { container } = render(
      <RenderDemo theme="light" generatedCss={generatedCss}>
        <p>Styled demo</p>
      </RenderDemo>,
    );

    const iframe = container.querySelector("iframe");

    assert.ok(iframe);

    await waitFor(() => {
      const styles = Array.from(
        iframe.contentDocument?.querySelectorAll("style") ?? [],
      );

      assert.ok(
        styles.some((style) =>
          style.textContent?.includes("--main-bg-color: #ffffff"),
        ),
      );
    });
  });

  it("initializes the iframe document body styles", async () => {
    const { container } = render(
      <RenderDemo theme="light" generatedCss="">
        <p>Body styles</p>
      </RenderDemo>,
    );

    const iframe = container.querySelector("iframe");

    assert.ok(iframe);

    await waitFor(() => {
      const document = iframe.contentDocument;

      assert.ok(document);
      assert.equal(document.documentElement.style.height, "100%");
      assert.equal(document.body.style.height, "100%");
      assert.equal(document.body.style.margin, "0px");
      assert.equal(document.body.style.padding, "0px");
      assert.equal(document.body.style.overflow, "hidden");
    });
  });
});
