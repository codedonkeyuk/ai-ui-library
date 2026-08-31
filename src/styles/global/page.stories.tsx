import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Styles/Global/page",
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
      <div className="page">
        <h1>Hello World</h1>
        <p>This is a paragrph.</p>
      </div>
    </div>
  ),
};
