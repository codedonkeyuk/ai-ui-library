import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./main.css";

const meta: Meta = {
  title: "Styles/Main.css/page",
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
    <div className="container">
      <div className="page" role="status" aria-label="Loading">
        <h1>Hello World</h1>
        <p>This is a paragrph.</p>
      </div>
    </div>
  ),
};
