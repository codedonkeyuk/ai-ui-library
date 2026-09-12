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

const additionalVariables = `
  --spinner-size: 50px;
  --spinner-thickness: 5px;
  --spinner-speed: 1s;

  --font-body: clamp(1rem, 0.95rem + 0.2vw, 1.125rem);
  --font-h3: clamp(1.25rem, 1.1rem + 0.6vw, 1.75rem);
  --font-h2: clamp(1.5rem, 1.3rem + 1vw, 2.25rem);
  --font-h1: clamp(2rem, 1.6rem + 1.8vw, 3.5rem);
  --line-height-body: 1.6;
  --line-height-heading: 1.25;
`;

const loadingCss = `
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

export const modernCss = (config: ColorConfigGroup) => `
:root {
  color-scheme: light dark;

  ${generateModernVariables(config)}

${additionalVariables}
}
:root[data-theme="light"] {
  color-scheme: light;
}
:root[data-theme="dark"] {
  color-scheme: dark;
}

${loadingCss}
`;

export const renderStorybookCss = (config: ColorConfigGroup) => `
#storybook-root,
.sb-unstyled {
  color-scheme: light dark;

  ${generateModernVariables(config)}

${additionalVariables}
}

#storybook-root[data-theme="light"],
.sb-unstyled[data-theme="light"] {
  color-scheme: light;
}

#storybook-root[data-theme="dark"],
.sb-unstyled[data-theme="dark"] {
  color-scheme: dark;
}

${loadingCss}
`;
