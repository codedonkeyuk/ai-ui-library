import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Pills from "./Pills";

const meta: Meta<typeof Pills> = {
  title: "Components/Pills",
  component: Pills,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Aligns the pills container horizontally",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pills>;

const defaultItems = [
  { id: 1, label: "React", selected: true },
  { id: 2, label: "TypeScript", selected: false },
  { id: 3, label: "Styled Components", selected: false },
  { id: 4, label: "Storybook", selected: false },
];

export const Default: Story = {
  args: { position: "start" },
  render: (args) => {
    const [items, setItems] = useState(defaultItems);

    const handleSingleSelect = (clickedId: string | number) => {
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          selected: item.id === clickedId,
        })),
      );
    };

    return <Pills {...args} items={items} onChange={handleSingleSelect} />;
  },
};

export const SingleSelect: Story = {
  args: { position: "start" },

  render: (args) => {
    const [items, setItems] = useState(defaultItems);

    const handleSingleSelect = (clickedId: string | number) => {
      setItems((prev) =>
        prev.map((item) => ({
          ...item,
          selected: item.id === clickedId,
        })),
      );
    };

    return <Pills {...args} items={items} onChange={handleSingleSelect} />;
  },

  parameters: {
    docs: {
      source: {
        language: "tsx",
        code: `
function SingleSelectExample() {
  const [items, setItems] = useState(defaultItems);

  const handleSingleSelect = (clickedId: string | number) => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.id === clickedId,
      }))
    );
  };

  return (
    <Pills
      position="start"
      items={items}
      onChange={handleSingleSelect}
    />
  );
}
        `.trim(),
      },
    },
  },
};

export const MultiSelect: Story = {
  args: { position: "start" },

  render: (args) => {
    const [items, setItems] = useState(defaultItems);

    const handleMultiSelect = (clickedId: string | number) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === clickedId
            ? {
                ...item,
                selected: !item.selected,
              }
            : item,
        ),
      );
    };

    return <Pills {...args} items={items} onChange={handleMultiSelect} />;
  },

  parameters: {
    docs: {
      source: {
        language: "tsx",
        code: `
function MultiSelectExample() {
  const [items, setItems] = useState(defaultItems);

  const handleMultiSelect = (clickedId: string | number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === clickedId
          ? {
              ...item,
              selected: !item.selected,
            }
          : item
      )
    );
  };

  return (
    <Pills
      position="start"
      items={items}
      onChange={handleMultiSelect}
    />
  );
}
        `.trim(),
      },
    },
  },
};
