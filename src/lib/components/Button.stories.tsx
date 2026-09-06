import type { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonLink, ButtonRouterLink } from "./Button.tsx";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    primary: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

/**
 * Default Button Component
 * Used for actions like submitting forms or triggering JavaScript functions.
 */
export const Default: Story = {
  args: {
    children: "Click Me",
    primary: false,
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Action",
    primary: true,
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    children: "Large Action",
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    children: "Can't Click Me",
    disabled: true,
  },
};

/**
 * ButtonLink Component
 * Used for standard HTML anchors (e.g., external links).
 */
export const Link: Story = {
  render: () => (
    <ButtonLink href="https://codedonkey.uk" primary={true}>
      External Link
    </ButtonLink>
  ),
};

/**
 * ButtonRouterLink Component
 * Used for internal navigation using React Router.
 */
export const RouterLink: Story = {
  render: () => (
    <ButtonRouterLink to="/dashboard" primary={true}>
      Go to Dashboard
    </ButtonRouterLink>
  ),
};
