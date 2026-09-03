import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Styles/Global/button",
};

export default meta;

export const Default: StoryObj = {
  render: (): React.JSX.Element => (
    <button className="btn">Standard Button</button>
  ),
};
