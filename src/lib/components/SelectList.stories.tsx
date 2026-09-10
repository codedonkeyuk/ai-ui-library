import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SelectList from "./SelectList";

const meta: Meta<typeof SelectList> = {
  title: "Components/SelectList",
  component: SelectList,
  tags: ["autodocs"],
  argTypes: {
    required: { control: "boolean" },
    description: { control: "text" },
    warningMessage: { control: "text" },
  },
  args: {
    id: "country-select",
    name: "country",
    label: "Select your country",
    value: "",
    onChange: () => {},
    children: (
      <>
        <option value="">-- Please choose an option --</option>
        <option value="uk">United Kingdom</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
      </>
    ),
  },
  render: (args) => {
    const [val, setVal] = useState(args.value || "");
    return (
      <SelectList
        {...args}
        value={val}
        onChange={(e) => {
          setVal(e.target.value);
          args.onChange(e);
        }}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof SelectList>;

export const Default: Story = {};

export const PreSelected: Story = {
  args: {
    value: "us",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const WithDescription: Story = {
  args: {
    description:
      "Your selection will determine shipping rates and delivery times.",
  },
};

export const WithWarning: Story = {
  args: {
    warningMessage: "Please choose a country. This field cannot be left blank.",
  },
};
