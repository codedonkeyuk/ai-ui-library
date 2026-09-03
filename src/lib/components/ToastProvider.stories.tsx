import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./ToastProvider";

const meta: Meta<typeof ToastProvider> = {
  title: "Components/ToastProvider",
  component: ToastProvider,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
  render: () => {
    return (
      <ToastProvider>
        {(() => {
          /*
            Appologies for code, inline function lets me show the useToast. Dont do this in production!
          */
          const { show } = useToast();
          return (
            <div className="button-bar start">
              <button
                className="btn"
                onClick={() => show({ message: "Info", variant: "info" })}
              >
                Info
              </button>
              <button
                className="btn"
                onClick={() => show({ message: "Warning", variant: "warning" })}
              >
                Warning
              </button>
              <button
                className="btn"
                onClick={() => show({ message: "Error", variant: "error" })}
              >
                Error
              </button>
              <button
                className="btn"
                onClick={() => show({ message: "Success", variant: "success" })}
              >
                Success
              </button>
            </div>
          );
        })()}
      </ToastProvider>
    );
  },
};
