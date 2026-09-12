import { afterEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

mock.module("storybook/internal/components", {
  namedExports: {
    Form: {
      Input: ({
        id,
        type,
        value,
        onChange,
      }: {
        id: string;
        type: string;
        value: string;
        onChange: React.ChangeEventHandler<HTMLInputElement>;
      }) => <input id={id} type={type} value={value} onChange={onChange} />,
    },
    Button: ({
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }) => (
      <button type="button" onClick={onClick}>
        {children}
      </button>
    ),
    H2: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
    H3: ({ children }: { children: React.ReactNode }) => <h3>{children}</h3>,
  },
});

mock.module("./RenderDemo", {
  defaultExport: ({
    theme,
    generatedCss,
    children,
  }: {
    theme: "light" | "dark";
    generatedCss: string;
    children: React.ReactNode;
  }) => (
    <div data-testid="render-demo">
      <span data-testid="demo-theme">{theme}</span>

      <pre data-testid="demo-css">{generatedCss}</pre>

      <div>{children}</div>
    </div>
  ),
});

mock.module("./RenderCode", {
  defaultExport: ({ colorCss }: { colorCss: string }) => (
    <pre data-testid="render-code">{colorCss}</pre>
  ),
});

mock.module("./GenerateCss", {
  namedExports: {
    modernCss: (stylesConfig: any) => {
      const props = stylesConfig.colors?.properties["main-bg-color"] || {
        light: "#ffffff",
        dark: "#111111",
      };
      return `--main-bg-color: light-dark(${props.light}, ${props.dark});`;
    },
    renderStorybookCss: (stylesConfig: any) => {
      const props = stylesConfig.colors?.properties["main-bg-color"] || {
        light: "#ffffff",
        dark: "#111111",
      };
      return `#storybook-root { --main-bg-color: light-dark(${props.light}, ${props.dark}); }`;
    },
    // Added mock for renderLegacyCss
    renderLegacyCss: (stylesConfig: any) => {
      const props = stylesConfig.colors?.properties["main-bg-color"] || {
        light: "#ffffff",
        dark: "#111111",
      };
      return `:root { --main-bg-color: ${props.light}; } @media (prefers-color-scheme: dark) { :root { --main-bg-color: ${props.dark}; } }`;
    },
  },
});

mock.module("./Styles/Styles", {
  defaultExport: {
    colors: {
      properties: {
        "main-bg-color": {
          light: "#ffffff",
          dark: "#111111",
        },
        "main-fg-color": {
          light: "#111111",
          dark: "#ffffff",
        },
      },

      example: () => <div>Colors example</div>,
    },

    spacing: {
      properties: {
        "spacing-small": {
          light: "4px",
          dark: "4px",
        },
      },

      example: () => <div>Spacing example</div>,
    },
  },
});

const { default: GenerateTheme } = await import("./GenerateTheme");

describe("GenerateTheme", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the initial group and preview", async () => {
    render(<GenerateTheme />);

    assert.ok(screen.getByRole("heading", { name: "Select Controls" }));
    assert.ok(
      screen.getByRole("heading", { name: "Updated Related Properties" }),
    );
    assert.ok(screen.getByRole("heading", { name: "Preview" }));

    assert.ok(screen.getByText("--main-bg-color"));
    assert.ok(screen.getByText("--main-fg-color"));
    assert.ok(screen.getByTestId("render-demo"));

    assert.equal(screen.getByTestId("demo-theme").textContent, "light");

    await waitFor(() => {
      assert.match(
        screen.getByTestId("demo-css").textContent ?? "",
        /--main-bg-color: light-dark\(#ffffff, #111111\);/,
      );
    });
  });

  it("changes the active group", () => {
    render(<GenerateTheme />);

    fireEvent.click(screen.getByRole("button", { name: "spacing" }));

    assert.ok(screen.getByText("--spacing-small"));
    assert.equal(screen.queryByText("--main-bg-color"), null);
    assert.equal(screen.queryByText("--main-fg-color"), null);
  });

  it("switches from preview to css code view", async () => {
    render(<GenerateTheme />);

    fireEvent.click(screen.getByRole("button", { name: "CSS" }));

    assert.ok(screen.getByTestId("render-code"));
    assert.equal(screen.queryByTestId("render-demo"), null);

    assert.ok(screen.getByText(/overwriting/));
    assert.ok(screen.getByText(/\/src\/lib\/styles\/loading\.css/));

    await waitFor(() => {
      assert.match(
        screen.getByTestId("render-code").textContent ?? "",
        /--main-bg-color: light-dark\(#ffffff, #111111\);/,
      );
    });
  });

  it("switches from preview to legacy css view", async () => {
    render(<GenerateTheme />);

    // Click the newly introduced Legacy CSS button option
    fireEvent.click(screen.getByRole("button", { name: "Legacy CSS" }));

    assert.ok(screen.getByTestId("render-code"));
    assert.equal(screen.queryByTestId("render-demo"), null);

    // Verify both legacy description guidelines are visible
    assert.ok(
      screen.getByText(
        /This is for older browsers that do not support light-dark css/,
      ),
    );
    assert.ok(screen.getByText(/\/src\/lib\/styles\/loading\.css/));

    await waitFor(() => {
      assert.match(
        screen.getByTestId("render-code").textContent ?? "",
        /@media \(prefers-color-scheme: dark\)/,
      );
    });
  });

  it("switches from preview to storybook css view", async () => {
    render(<GenerateTheme />);

    fireEvent.click(screen.getByRole("button", { name: "Storybook Css" }));

    assert.ok(screen.getByTestId("render-code"));
    assert.equal(screen.queryByTestId("render-demo"), null);

    assert.ok(
      screen.getByText(/If you want to update the storybook site styles/),
    );
    assert.ok(screen.getByText(/\/src\/lib\/styles\/storybook-loading\.css/));

    await waitFor(() => {
      assert.match(
        screen.getByTestId("render-code").textContent ?? "",
        /#storybook-root/,
      );
    });
  });

  it("switches back from code view modes back to preview", () => {
    render(<GenerateTheme />);

    fireEvent.click(screen.getByRole("button", { name: "CSS" }));
    assert.ok(screen.getByTestId("render-code"));

    fireEvent.click(screen.getByRole("button", { name: "Preview" }));
    assert.ok(screen.getByTestId("render-demo"));
    assert.equal(screen.queryByTestId("render-code"), null);
  });

  it("changes the preview theme", () => {
    render(<GenerateTheme />);

    assert.equal(screen.getByTestId("demo-theme").textContent, "light");

    fireEvent.click(screen.getByRole("button", { name: "Dark Mode" }));

    assert.equal(screen.getByTestId("demo-theme").textContent, "dark");
  });

  it("renders the active example in preview mode", () => {
    render(<GenerateTheme />);

    assert.ok(screen.getByText("Colors example"));
  });

  it("updates generated CSS when a configuration input changes", async () => {
    render(<GenerateTheme />);

    const lightInput = document.getElementById("main-bg-color-light");

    assert.ok(lightInput);

    fireEvent.change(lightInput, {
      target: {
        value: "#eeeeee",
      },
    });

    await waitFor(() => {
      assert.match(
        screen.getByTestId("demo-css").textContent ?? "",
        /--main-bg-color: light-dark\(#eeeeee, #111111\);/,
      );
    });
  });
});
