import type { ColorConfigItem } from "../Types";

const loadingStyles: ColorConfigItem = {
  properties: {
    "spinner-track-color": {
      light: "#e0e0e0",
      dark: "#e0e0e0",
    },
    "spinner-accent-color": {
      light: "#3498db",
      dark: "#3498db",
    },
  },
  example: () => (
    <div className="message-container">
      <div className="loading-spinner" role="status" aria-label="Loading"></div>
    </div>
  ),
};

export default loadingStyles;
