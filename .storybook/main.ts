// .storybook/main.ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/docs/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite",
  staticDirs: [
    {
      from: "../assets",
      to: "/",
    },
  ],

  viteFinal: async (config) => {
    return {
      ...config,
      build: {
        ...config.build,
        cssMinify: "esbuild",
      },
    };
  },
};

export default config;
