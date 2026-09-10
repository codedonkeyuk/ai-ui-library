import { afterEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { cleanup, render, screen } from "@testing-library/react";

mock.module("storybook/internal/components", {
  namedExports: {
    SyntaxHighlighter: ({
      children,
      language,
      bordered,
      copyable,
      format,
    }: {
      children: React.ReactNode;
      language: string;
      bordered: boolean;
      copyable: boolean;
      format: boolean;
    }) => (
      <pre
        data-language={language}
        data-bordered={String(bordered)}
        data-copyable={String(copyable)}
        data-format={String(format)}
      >
        <code>{children}</code>
      </pre>
    ),
  },
});

const { default: RenderCode } = await import("./RenderCode");

describe("RenderCode", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the supplied CSS", () => {
    const colorCss = `:root {
  --main-bg-color: light-dark(#ffffff, #111111);
}`;

    const { container } = render(<RenderCode colorCss={colorCss} />);

    const codeElement = container.querySelector("code");

    assert.ok(codeElement);
    assert.equal(codeElement.textContent, colorCss);
  });

  it("passes the expected props to SyntaxHighlighter", () => {
    render(<RenderCode colorCss="--main-color: red;" />);

    const codeBlock = screen.getByRole("code");

    assert.equal(codeBlock.parentElement?.getAttribute("data-language"), "css");
    assert.equal(
      codeBlock.parentElement?.getAttribute("data-bordered"),
      "true",
    );
    assert.equal(
      codeBlock.parentElement?.getAttribute("data-copyable"),
      "true",
    );
    assert.equal(codeBlock.parentElement?.getAttribute("data-format"), "true");
  });

  it("renders an empty CSS string", () => {
    const { container } = render(<RenderCode colorCss="" />);

    const codeElement = container.querySelector("code");

    assert.ok(codeElement);
    assert.equal(codeElement.textContent, "");
  });
});
