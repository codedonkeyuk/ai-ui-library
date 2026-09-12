import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  generateModernVariables,
  modernCss,
  renderStorybookCss,
  renderLegacyCss,
} from "./GenerateCss";

import type { ColorConfigGroup } from "./Types";

describe("generateModernVariables", () => {
  it("generates light-dark CSS variables", () => {
    const config: ColorConfigGroup = {
      brand: {
        properties: {
          "main-bg-color": {
            light: "#ffffff",
            dark: "#111111",
          },
          "main-text-color": {
            light: "#111111",
            dark: "#ffffff",
          },
        },
        example: () => <>Hello</>,
      },
    };

    const result = generateModernVariables(config);

    assert.equal(
      result,
      "--main-bg-color: light-dark(#ffffff, #111111);\n" +
        "  --main-text-color: light-dark(#111111, #ffffff);",
    );
  });

  it("uses transparent when the light value is empty", () => {
    const config: ColorConfigGroup = {
      colors: {
        properties: {
          "empty-light": {
            light: "",
            dark: "#000000",
          },
        },
        example: () => <>Hello</>,
      },
    };

    const result = generateModernVariables(config);

    assert.equal(result, "--empty-light: light-dark(transparent, #000000);");
  });

  it("uses transparent when the dark value is empty", () => {
    const config: ColorConfigGroup = {
      colors: {
        properties: {
          "empty-dark": {
            light: "#ffffff",
            dark: "",
          },
        },
        example: () => <>Hello</>,
      },
    };

    const result = generateModernVariables(config);

    assert.equal(result, "--empty-dark: light-dark(#ffffff, transparent);");
  });

  it("uses transparent when both values are empty", () => {
    const config: ColorConfigGroup = {
      colors: {
        properties: {
          "empty-both": {
            light: "",
            dark: "",
          },
        },
        example: () => <>Hello</>,
      },
    };

    const result = generateModernVariables(config);

    assert.equal(result, "--empty-both: light-dark(transparent, transparent);");
  });

  it("generates variables from multiple groups", () => {
    const config: ColorConfigGroup = {
      brand: {
        properties: {
          "brand-primary": {
            light: "#3366ff",
            dark: "#99bbff",
          },
        },
        example: () => <>Hello</>,
      },
      text: {
        properties: {
          "text-primary": {
            light: "#111111",
            dark: "#eeeeee",
          },
        },
        example: () => <>Hello</>,
      },
    };

    const result = generateModernVariables(config);

    assert.equal(
      result,
      "--brand-primary: light-dark(#3366ff, #99bbff);\n" +
        "  --text-primary: light-dark(#111111, #eeeeee);",
    );
  });

  it("returns an empty string for an empty config", () => {
    const config = {} as ColorConfigGroup;

    assert.equal(generateModernVariables(config), "");
  });
});

describe("modernCss", () => {
  it("includes generated color variables", () => {
    const config: ColorConfigGroup = {
      colors: {
        properties: {
          "main-bg-color": {
            light: "#ffffff",
            dark: "#111111",
          },
        },
        example: () => <>Hello</>,
      },
    };

    const result = modernCss(config);

    assert.match(result, /--main-bg-color: light-dark\(#ffffff, #111111\);/);
  });

  it("includes the root color scheme", () => {
    const config = {} as ColorConfigGroup;

    const result = modernCss(config);

    assert.match(result, /:root\s*{[\s\S]*color-scheme: light dark;/);
  });

  it("includes the spinner variables", () => {
    const result = modernCss({} as ColorConfigGroup);

    assert.match(result, /--spinner-size: 50px;/);
    assert.match(result, /--spinner-thickness: 5px;/);
    assert.match(result, /--spinner-speed: 1s;/);
  });

  it("includes the loading spinner styles and animation", () => {
    const result = modernCss({} as ColorConfigGroup);

    assert.match(result, /\.loading-spinner\s*{/);
    assert.match(
      result,
      /animation: spin var\(--spinner-speed\) linear infinite;/,
    );
    assert.match(result, /@keyframes spin/);
  });
});

describe("renderStorybookCss", () => {
  it("scopes styles to storybook root and unstyled containers", () => {
    const result = renderStorybookCss({} as ColorConfigGroup);

    assert.match(result, /#storybook-root,\s*\.sb-unstyled/);
    assert.match(result, /color-scheme: light dark;/);
  });

  it("includes localized storybook theme attribute overrides", () => {
    const result = renderStorybookCss({} as ColorConfigGroup);

    assert.match(
      result,
      /#storybook-root\[data-theme="light"\],\s*\.sb-unstyled\[data-theme="light"\]/,
    );
    assert.match(
      result,
      /#storybook-root\[data-theme="dark"\],\s*\.sb-unstyled\[data-theme="dark"\]/,
    );
  });

  it("includes shared spinner assets and animations", () => {
    const result = renderStorybookCss({} as ColorConfigGroup);

    assert.match(result, /--spinner-size: 50px;/);
    assert.match(result, /\.loading-spinner\s*{/);
  });
});

describe("renderLegacyCss", () => {
  it("renders explicit light variable values by default under the root", () => {
    const config: ColorConfigGroup = {
      colors: {
        properties: {
          "main-bg-color": {
            light: "#ffffff",
            dark: "#111111",
          },
        },
        example: () => <>Hello</>,
      },
    };

    const result = renderLegacyCss(config);

    assert.match(result, /:root\s*{[\s\S]*--main-bg-color:\s*#ffffff;/);
  });

  it("contains media queries for automatic dark system preferences matching", () => {
    const config: ColorConfigGroup = {
      colors: {
        properties: {
          "main-bg-color": {
            light: "#ffffff",
            dark: "#111111",
          },
        },
        example: () => <>Hello</>,
      },
    };

    const result = renderLegacyCss(config);

    assert.match(result, /@media\s*\(prefers-color-scheme:\s*dark\)/);
    assert.match(result, /:root\s*{[\s\S]*--main-bg-color:\s*#111111;/);
  });
});
