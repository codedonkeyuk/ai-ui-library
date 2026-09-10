import type { ColorConfigItem } from "../Types";

const dialogStyles: ColorConfigItem = {
  properties: {
    "dialog-bg-color": {
      light: "#ffffff",
      dark: "#000000",
    },
    "dialog-fg-color": {
      light: "#000000",
      dark: "#ffffff",
    },
  },
  example: () => <div>Dialog Example</div>,
};

export default dialogStyles;
