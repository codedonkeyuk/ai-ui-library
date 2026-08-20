import type { StorybookConfig } from "@storybook/react-vite"; // Use @storybook/vue3-vite if using Vue

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
