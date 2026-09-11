import { create, type ThemeVars } from "storybook/theming";

export default create({
  base: "dark",

  brandTitle: "AI-UI-LIBRARY",
  brandUrl: "https://ai-ui-library.codedonkey.uk",
  brandTarget: "_self",
}) satisfies ThemeVars as ThemeVars;
