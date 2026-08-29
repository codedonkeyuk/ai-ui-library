import type { Meta, StoryObj } from "@storybook/react";
import Toast from "./Toast.tsx";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Toast>;

const baseProps = (
  message: string,
  variant: "success" | "warning" | "error" | "info",
) => ({
  isVisible: true,
  message,
  variant,
  duration: 5000,
});

export const Success: Story = {
  args: {
    ...baseProps("Operation successful!", "success"),
  },
};

export const Warning: Story = {
  args: {
    ...baseProps("Warning: Your subscription expires soon.", "warning"),
  },
};

export const Error: Story = {
  args: {
    ...baseProps("Error: Could not connect to server.", "error"),
  },
};

export const Info: Story = {
  args: {
    ...baseProps("New update available!", "info"),
  },
};
