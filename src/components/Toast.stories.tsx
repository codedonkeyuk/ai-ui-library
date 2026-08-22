import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./ToastProvider.tsx";
import type { JSX } from "react/jsx-runtime";

const ToastTestComponent = (): JSX.Element => {
  const { show } = useToast();

  return (
    <>
      <p>
        <button
          className="btn"
          onClick={() => {
            show({
              message: "Watch out! This action might be irreversible.",
              variant: "info",
            });
          }}
        >
          Trigger Info
        </button>
      </p>{" "}
      <p>
        <button
          className="btn"
          onClick={() => {
            show({
              message: "Watch out! This action might be irreversible.",
              variant: "warning",
            });
          }}
        >
          Trigger warning
        </button>
      </p>
      <p>
        <button
          className="btn"
          onClick={() => {
            show({
              message: "Watch out! This action might be irreversible.",
              variant: "error",
            });
          }}
        >
          Trigger Error
        </button>
      </p>
      <p>
        <button
          className="btn"
          onClick={() => {
            show({
              message: "Watch out! This action might be irreversible.",
              variant: "success",
            });
          }}
        >
          Trigger Success
        </button>
      </p>
    </>
  );
};

const meta: Meta<typeof ToastTestComponent> = {
  title: "Components/Toast",
  component: ToastTestComponent,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
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
  render: (): React.JSX.Element => <ToastTestComponent />,
};
