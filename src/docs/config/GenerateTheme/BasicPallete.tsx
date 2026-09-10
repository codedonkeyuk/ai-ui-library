import type { ColorConfig, ColorConfigGroup } from "./Types";

export const DefaultStyles: ColorConfigGroup = {
  "Basic Styles": {
    properties: {
      "main-bg-color": {
        light: "#121212",
        dark: "#000000",
      },
      "main-fg-color": {
        light: "#ffffff",
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
  },
  Dialog: {
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
  },
  Buttons: {
    properties: {
      "prim-btn-bg-color": {
        light: "#007bff",
        dark: "#3b82f6",
      },
      "prim-btn-fg-color": {
        light: "#ffffff",
        dark: "#ffffff",
      },
      "prim-btn-hvr-color": {
        light: "#0056b3",
        dark: "#2563eb",
      },
      "prim-btn-bdr-color": {
        light: "transparent",
        dark: "transparent",
      },
      "sec-btn-bg-color": {
        light: "#ccc",
        dark: "#27272a",
      },
      "sec-btn-fg-color": {
        light: "#000000",
        dark: "#f4f4f5",
      },
      "sec-btn-hvr-color": {
        light: "#999",
        dark: "#3f3f46",
      },
      "sec-btn-bdr-color": {
        light: "transparent",
        dark: "#ffffff",
      },
      "dis-btn-bg-color": {
        light: "transparent",
        dark: "#ffffff0d",
      },
      "dis-btn-fg-color": {
        light: "transparent",
        dark: "#ffffff61",
      },
      "dis-btn-hvr-color": {
        light: "transparent",
        dark: "#ffffff0d",
      },
      "dis-btn-bdr-color": {
        light: "transparent",
        dark: "transparent",
      },
    },
    example: () => <div>Buttons example</div>,
  },
  "Text Fields": {
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
  },
  Navigation: {
    properties: {
      "main-nav-bg-color": {
        light: "#ffffff",
        dark: "#000000",
      },
    },
    example: () => <div>Navigation Example</div>,
  },
  Toast: {
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
  },
};

export const BasicPallete: ColorConfig = {
  "main-bg-color": {
    light: "#121212",
    dark: "#000000",
  },
  "main-fg-color": {
    light: "#ffffff",
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
  "dialog-bg-color": {
    light: "#ffffff",
    dark: "#000000",
  },
  "dialog-fg-color": {
    light: "#000000",
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
  "prim-btn-bg-color": {
    light: "#007bff",
    dark: "#3b82f6",
  },
  "prim-btn-fg-color": {
    light: "#ffffff",
    dark: "#ffffff",
  },
  "prim-btn-hvr-color": {
    light: "#0056b3",
    dark: "#2563eb",
  },
  "prim-btn-bdr-color": {
    light: "transparent",
    dark: "transparent",
  },
  "sec-btn-bg-color": {
    light: "#ccc",
    dark: "#27272a",
  },
  "sec-btn-fg-color": {
    light: "#000000",
    dark: "#f4f4f5",
  },
  "sec-btn-hvr-color": {
    light: "#999",
    dark: "#3f3f46",
  },
  "sec-btn-bdr-color": {
    light: "transparent",
    dark: "#ffffff",
  },
  "dis-btn-bg-color": {
    light: "transparent",
    dark: "#ffffff0d",
  },
  "dis-btn-fg-color": {
    light: "transparent",
    dark: "#ffffff61",
  },
  "dis-btn-hvr-color": {
    light: "transparent",
    dark: "#ffffff0d",
  },
  "dis-btn-bdr-color": {
    light: "transparent",
    dark: "transparent",
  },
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
  "main-nav-bg-color": {
    light: "#ffffff",
    dark: "#000000",
  },
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
};
