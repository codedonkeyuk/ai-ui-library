import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import "./buttons.css";

const meta: Meta = {
  title: "Styles/Buttons.css/button",
};

export default meta;

export const Default: StoryObj = {
  render: (): React.JSX.Element => (
    <button className="btn">Standard Button</button>
  ),
};
