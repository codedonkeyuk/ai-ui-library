import type { Preview } from "@storybook/react-vite";
import "../src/lib/styles/loading/storybook-loading.css";
import GlobalStyle from "../src/lib/styles/global/GlobalStyle";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Component Light Mode", icon: "sun" },
          { value: "dark", title: "Component Dark Mode", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },

  decorators: [
    (Story, context) => {
      const selectedTheme = context.globals.theme;

      const canvasContainer =
        context.canvasElement || document.getElementById("storybook-root");
      const unstyledContainers = document.querySelectorAll(".sb-unstyled");

      const applyThemeToElement = (el: Element) => {
        const htmlEl = el as HTMLElement;
        htmlEl.setAttribute("data-theme", selectedTheme);
        htmlEl.style.colorScheme = selectedTheme;
      };

      if (canvasContainer) {
        applyThemeToElement(canvasContainer);
      }

      unstyledContainers.forEach((panel) => {
        applyThemeToElement(panel);
      });

      return (
        <>
          <GlobalStyle />
          <Story />
        </>
      );
    },
  ],
};

export default preview;
