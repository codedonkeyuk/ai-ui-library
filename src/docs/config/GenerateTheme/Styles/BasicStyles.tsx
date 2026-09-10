import type { ColorConfigItem } from "../Types";

const basicStyles: ColorConfigItem = {
  properties: {
    "main-bg-color": {
      light: "#ffffff",
      dark: "#000000",
    },
    "main-fg-color": {
      light: "#000000",
      dark: "#ffffff",
    },
    "main-bdr-color": {
      light: "#2d2d2d",
      dark: "#ffffff",
    },
    "main-hover-color": {
      light: "#2a2a2a",
      dark: "#2a2a2a",
    },
    "card-bg-color": {
      light: "#1e1e1e",
      dark: "#000000",
    },
    "card-fg-color": {
      light: "#f4f4f5",
      dark: "#ffffff",
    },
    "alt1-bg-color": {
      light: "#1a1a1a",
      dark: "#1e1e1e",
    },
    "alt2-bg-color": {
      light: "#222222",
      dark: "#252525",
    },
  },
  example: () => <div>Basic Styles example</div>,
};

export default basicStyles;
