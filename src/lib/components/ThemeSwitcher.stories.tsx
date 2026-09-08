import type { Meta, StoryObj } from "@storybook/react";
import ThemeSwitcher from "./ThemeSwitcher.tsx";

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Components/ThemeSwitcher",
  component: ThemeSwitcher,
  decorators: [
    (Story) => (
      <div style={{ height: "300px", width: "300px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    html: {
      disable: true,
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {};
