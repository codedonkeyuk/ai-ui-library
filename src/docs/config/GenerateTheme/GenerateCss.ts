import type { ColorConfigGroup } from "./Types";

export const generateModernVariables = (
  configGroup: ColorConfigGroup,
): string => {
  return Object.values(configGroup)
    .flatMap((group) => Object.entries(group.properties))
    .map(([key, variants]) => {
      const lightVal = variants.light || "transparent";
      const darkVal = variants.dark || "transparent";
      return `--${key}: light-dark(${lightVal}, ${darkVal});`;
    })
    .join("\n  ");
};

export const modernCss = (config: ColorConfigGroup) => `
:root {
  color-scheme: light dark;

  --container-bg: #f9f9f9;

  --spinner-size: 50px;
  --spinner-thickness: 5px;
  --spinner-track-color: #e0e0e0;
  --spinner-accent-color: #3498db;
  --spinner-speed: 1s;

  ${generateModernVariables(config)}
}
:root[data-theme="light"] {
  color-scheme: light;
}
:root[data-theme="dark"] {
  color-scheme: dark;
}
.message-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.loading-spinner {
  width: var(--spinner-size);
  height: var(--spinner-size);
  border: var(--spinner-thickness) solid var(--spinner-track-color);
  border-top: var(--spinner-thickness) solid var(--spinner-accent-color);
  border-radius: 50%;
  animation: spin var(--spinner-speed) linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;
