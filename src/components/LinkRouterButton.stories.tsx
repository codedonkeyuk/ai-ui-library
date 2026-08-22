import type { Meta, StoryObj } from "@storybook/react";
import LinkRouterButton from "./LinkRouterButton.tsx";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof LinkRouterButton> = {
  title: "Components/LinkRouterButton",
  component: LinkRouterButton,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
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
export const Default: StoryObj = {
  render: (): React.JSX.Element => (
    <LinkRouterButton to="/">Standard Link</LinkRouterButton>
  ),
};
