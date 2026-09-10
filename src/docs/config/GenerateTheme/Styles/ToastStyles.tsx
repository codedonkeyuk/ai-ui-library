import type { ColorConfigItem } from "../Types";

const toastStyles: ColorConfigItem = {
  properties: {
    "toast-bg-success-color": {
      light: "#28a745",
      dark: "#1e4620",
    },
    "toast-bg-warning-color": {
      light: "#ffc107",
      dark: "#855d00",
    },
    "toast-bg-error-color": {
      light: "#dc3545",
      dark: "#661a21",
    },
    "toast-bg-info-color": {
      light: "#007bff",
      dark: "#0c3a66",
    },
    "toast-fg-light-color": {
      light: "#fff",
      dark: "#ffffff",
    },
    "toast-fg-dark-color": {
      light: "#000",
      dark: "#ffffff",
    },
  },
  example: () => <div>Toast Example</div>,
};

export default toastStyles;
