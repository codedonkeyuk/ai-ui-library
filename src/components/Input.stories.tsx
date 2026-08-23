// Input.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input.tsx";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  args: {
    label: "Example field",
    name: "example",
    warningMessage: "",
  },
  argTypes: {
    type: {
      control: "select",
      options: [
        "button",
        "checkbox",
        "color",
        "date",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "radio",
        "range",
        "reset",
        "search",
        "submit",
        "tel",
        "text",
        "time",
        "url",
        "week",
      ],
    },
    warningMessage: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    id: "text",
    name: "text",
    label: "Text",
    type: "text",
    placeholder: "Enter some text",
  },
};

export const Email: Story = {
  args: {
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
};

export const Password: Story = {
  args: {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
};

export const Search: Story = {
  args: {
    id: "search",
    name: "search",
    label: "Search",
    type: "search",
    placeholder: "Search",
  },
};

export const Telephone: Story = {
  args: {
    id: "telephone",
    name: "telephone",
    label: "Telephone",
    type: "tel",
    placeholder: "01234 567890",
  },
};

export const Url: Story = {
  args: {
    id: "url",
    name: "url",
    label: "Website",
    type: "url",
    placeholder: "https://example.com",
  },
};

export const Number: Story = {
  args: {
    id: "number",
    name: "number",
    label: "Age",
    type: "number",
    min: 0,
    max: 120,
  },
};

export const Date: Story = {
  args: {
    id: "date",
    name: "date",
    label: "Date",
    type: "date",
  },
};

export const DateTimeLocal: Story = {
  args: {
    id: "datetime-local",
    name: "datetime-local",
    label: "Date and time local",
    type: "datetime-local",
  },
};

export const Month: Story = {
  args: {
    id: "month",
    name: "month",
    label: "Month",
    type: "month",
  },
};

export const Time: Story = {
  args: {
    id: "time",
    name: "time",
    label: "Time",
    type: "time",
  },
};

export const Week: Story = {
  args: {
    id: "week",
    name: "week",
    label: "Week",
    type: "week",
  },
};

export const Checkbox: Story = {
  args: {
    id: "checkbox",
    name: "checkbox",
    label: "Accept the terms",
    type: "checkbox",
  },
};

export const Radio: Story = {
  args: {
    id: "radio",
    name: "radio",
    label: "Select this option",
    type: "radio",
  },
};

export const Range: Story = {
  args: {
    id: "range",
    name: "range",
    label: "Volume",
    type: "range",
    min: 0,
    max: 100,
    defaultValue: 50,
  },
};

export const Color: Story = {
  args: {
    id: "color",
    name: "color",
    label: "Choose a color",
    type: "color",
    defaultValue: "#646cff",
  },
};

export const File: Story = {
  args: {
    id: "file",
    name: "file",
    label: "Upload a file",
    type: "file",
  },
};

export const WithWarning: Story = {
  args: {
    id: "warning",
    name: "warning",
    label: "Email",
    type: "email",
    warningMessage: "Please enter a valid email address.",
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled",
    name: "disabled",
    label: "Disabled field",
    type: "text",
    disabled: true,
    value: "This field is disabled",
    readOnly: true,
  },
};
