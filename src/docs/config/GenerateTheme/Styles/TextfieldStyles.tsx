import type { ColorConfigItem } from "../Types";

const textfieldStyles: ColorConfigItem = {
  properties: {
    "field-bg-color": {
      light: "#fff",
      dark: "#1a1a1a",
    },
    "field-fg-color": {
      light: "#000000",
      dark: "#ffffff",
    },
    "field-warning-color": {
      light: "#a33a3a",
      dark: "#ef4444",
    },
    "field-desc-color": {
      light: "#666",
      dark: "#a1a1aa",
    },
    "field-placeholder-color": {
      light: "#8996a3",
      dark: "#71717a",
    },
    "field-dis-bg-color": {
      light: "#f2f4f5",
      dark: "#121212",
    },
    "field-dis-fg-color": {
      light: "#7b8790",
      dark: "#52525b",
    },
  },
  example: () => <div>Textfields Example</div>,
};

export default textfieldStyles;
