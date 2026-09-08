// .storybook/preview.ts
import type { Preview } from "@storybook/react-vite";
import "../src/lib/styles/loading/loading.css";
import GlobalStyle from "../src/lib/styles/global/GlobalStyle";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "system",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "system", title: "Browser Theme", icon: "mirror" },
          { value: "light", title: "Light Mode", icon: "sun" },
          { value: "dark", title: "Dark Mode", icon: "moon" },
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
      const selectedTheme = context.globals.theme || "system";
      const htmlElement = document.documentElement;

      if (selectedTheme === "system") {
        // 3. For System: remove data-theme completely so it falls back to system rules
        htmlElement.removeAttribute("data-theme");
        htmlElement.style.colorScheme = "light dark"; // Tells browser to evaluate system preference
      } else {
        // For Light/Dark: explicitly override everything
        htmlElement.setAttribute("data-theme", selectedTheme);
        htmlElement.style.colorScheme = selectedTheme;
      }

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
