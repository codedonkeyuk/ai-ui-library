// InputCheckboxGroup.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import InputCheckboxGroup from "./InputCheckboxGroup";

const meta: Meta<typeof InputCheckboxGroup> = {
  title: "Components/InputCheckboxGroup",
  component: InputCheckboxGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputCheckboxGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const initialCheckboxes = [
  {
    id: "email",
    label: "Email notifications",
    selected: true,
  },
  {
    id: "sms",
    label: "SMS notifications",
    selected: false,
  },
  {
    id: "push",
    label: "Push notifications",
    selected: false,
  },
];

export const Default: Story = {
  render: (args) => {
    const [checkboxes, setCheckboxes] = useState(args.checkboxes);

    return (
      <InputCheckboxGroup
        {...args}
        checkboxes={checkboxes}
        checkboxSelected={(id, selected) => {
          setCheckboxes((current) =>
            current.map((checkbox) =>
              checkbox.id === id ? { ...checkbox, selected } : checkbox,
            ),
          );
        }}
      />
    );
  },
  args: {
    legend: "Notification preferences",
    checkboxes: initialCheckboxes,
    checkboxSelected: () => {},
  },
};
