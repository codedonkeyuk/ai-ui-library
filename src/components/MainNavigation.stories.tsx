import type { Meta, StoryObj } from "@storybook/react";

import MainNavigation, { type NavigationLink } from "./MainNavigation.tsx";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof MainNavigation> = {
  title: "Components/MainNavigation",
  component: MainNavigation,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof MainNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

const links: NavigationLink[] = [
  {
    to: "/sitea",
    name: "Site A",
  },
  {
    to: "/siteb",
    name: "Site B",
  },
  {
    to: "/sitec",
    name: "Site C",
    sublinks: [
      {
        to: "/sitec1",
        name: "Site C-1",
      },
      {
        to: "/sitec2",
        name: "Site C-2",
      },
      {
        to: "/sitec3",
        name: "Site C-3",
        sublinks: [
          {
            to: "/sitec3a",
            name: "Site C 3 A",
          },
          {
            to: "/sitec3b",
            name: "Site  C 3 B",
          },
          {
            to: "/sitec3c",
            name: "Site  C 3 C",
          },
        ],
      },
    ],
  },
];

export const Default: Story = {
  render: (args) => {
    return <MainNavigation links={args.links} />;
  },
  args: {
    links: links,
  },
};
