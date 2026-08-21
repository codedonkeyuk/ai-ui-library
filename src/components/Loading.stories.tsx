import type { Meta, StoryObj } from "@storybook/react";
import Loading from "./Loading.tsx";

const meta: Meta<typeof Loading> = {
  title: "Components/Loading",
  component: Loading,
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
type Story = StoryObj<typeof Loading>;

export const Default: Story = {};
