import { Button } from "../../../../lib";
import type { ColorConfigItem } from "../Types";

const buttonStyles: ColorConfigItem = {
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
  example: () => (
    <div className="container">
      <div className="page">
        <div className="button-bar start">
          <Button size="small">Small Secondary Button</Button>
          <Button size="small" primary>
            Small Primary Button
          </Button>
        </div>
        <div className="button-bar start">
          <Button size="medium">Medium Secondary Button</Button>
          <Button size="medium" primary>
            Medium Primary Button
          </Button>
        </div>
        <div className="button-bar start">
          <Button size="large">Large Secondary Button</Button>
          <Button size="large" primary>
            Large Primary Button
          </Button>
        </div>
      </div>
    </div>
  ),
};

export default buttonStyles;
