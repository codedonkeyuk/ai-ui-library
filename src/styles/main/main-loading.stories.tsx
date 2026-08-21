import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./main.css";

const meta: Meta = {
  title: "Styles/Main.css/loading",
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
    <div className="spinner-container">
      <div className="loading-spinner" role="status" aria-label="Loading"></div>
    </div>
  ),
};
