import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Styles/Global/a-link",
};

export default meta;

export const Default: StoryObj = {
  render: (): React.JSX.Element => (
    <a href="#" className="btn">
      Standard Link
    </a>
  ),
};
