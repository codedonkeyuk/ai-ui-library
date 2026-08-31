import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./loading.css";

const meta: Meta = {
  title: "Styles/Loading.css",
  decorators: [
    (Story) => (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryObj = {
  render: (): React.JSX.Element => (
    <div className="message-container">
      <div className="loading-spinner" role="status" aria-label="Loading"></div>
    </div>
  ),
};
