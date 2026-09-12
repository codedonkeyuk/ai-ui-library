import { afterEach, describe, it, mock } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

mock.module("storybook/internal/components", {
  namedExports: {
    // FIX: Add the missing H3 mock component so heading queries work perfectly
    H3: ({ children }: { children: React.ReactNode }) => <h3>{children}</h3>,
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
  },
});

const { ConfigRow } = await import("./ConfigRow");
import type { ThemeVariants } from "./Types";

describe("ConfigRow", () => {
  afterEach(() => {
    cleanup();
  });

  const variants: ThemeVariants = {
    light: "#ffffff",
    dark: "#000000",
  };

  function renderConfigRow(
    onChange: (
      cssKey: string,
      mode: "light" | "dark",
      value: string,
    ) => void = () => {},
  ) {
    return render(
      <ConfigRow
        cssKey="main-bg-color"
        variants={variants}
        onChange={onChange}
      />,
    );
  }

  it("renders the CSS variable name", () => {
    renderConfigRow();

    assert.ok(
      screen.getByRole("heading", {
        name: "--main-bg-color",
      }),
    );
  });

  it("renders the light and dark inputs with their values", () => {
    renderConfigRow();

    const lightInput = screen.getByRole("textbox", {
      name: "Light",
    });

    const darkInput = screen.getByRole("textbox", {
      name: "Dark",
    });

    assert.equal(lightInput.id, "main-bg-color-light");
    assert.equal(darkInput.id, "main-bg-color-dark");

    assert.equal((lightInput as HTMLInputElement).value, "#ffffff");
    assert.equal((darkInput as HTMLInputElement).value, "#000000");
  });

  it("calls onChange when the light input changes", () => {
    const changes: Array<[string, "light" | "dark", string]> = [];

    renderConfigRow((cssKey, mode, value) => {
      changes.push([cssKey, mode, value]);
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Light" }), {
      target: { value: "#eeeeee" },
    });

    assert.deepEqual(changes, [["main-bg-color", "light", "#eeeeee"]]);
  });

  it("calls onChange when the dark input changes", () => {
    const changes: Array<[string, "light" | "dark", string]> = [];

    renderConfigRow((cssKey, mode, value) => {
      changes.push([cssKey, mode, value]);
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Dark" }), {
      target: { value: "#111111" },
    });

    assert.deepEqual(changes, [["main-bg-color", "dark", "#111111"]]);
  });
});
