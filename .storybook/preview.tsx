import type { Preview } from "@storybook/react-vite";
import "../src/lib/styles/loading/loading.css";
import GlobalStyle from "../src/lib/styles/global/GlobalStyle";

const preview: Preview = {
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
    (Story) => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
};
export default preview;
