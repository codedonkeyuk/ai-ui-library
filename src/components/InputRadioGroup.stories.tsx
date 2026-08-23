import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import InputRadioGroup from "./InputRadioGroup.tsx";
import type { Radio } from "./InputRadioGroup.tsx";

const meta: Meta<typeof InputRadioGroup> = {
  title: "Components/InputRadioGroup",
  component: InputRadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputRadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const initialRadios: Radio[] = [
  {
    id: "email",
    label: "Email",
    selected: true,
  },
  {
    id: "sms",
    label: "SMS",
    selected: false,
  },
  {
    id: "push",
    label: "Push notification",
    selected: false,
  },
];

export const Default: Story = {
  render: (args) => {
    const [radios, setRadios] = useState(args.radios);

    return (
      <InputRadioGroup
        {...args}
        radios={radios}
        radioSelected={(id) => {
          setRadios((current) =>
            current.map((radio) => ({
              ...radio,
              selected: radio.id === id,
            })),
          );
        }}
      />
    );
  },
  args: {
    legend: "Notification preference",
    radios: initialRadios,
    radioSelected: () => {},
  },
};

export const SecondOptionSelected: Story = {
  ...Default,
  args: {
    ...Default.args,
    radios: initialRadios.map((radio) => ({
      ...radio,
      selected: radio.id === "sms",
    })),
  },
};
