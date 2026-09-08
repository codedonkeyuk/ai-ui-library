import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./ToastProvider";
import Button from "./Button";

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
              <Button
                onClick={() => show({ message: "Info", variant: "info" })}
              >
                Info
              </Button>
              <Button
                onClick={() => show({ message: "Warning", variant: "warning" })}
              >
                Warning
              </Button>
              <Button
                onClick={() => show({ message: "Error", variant: "error" })}
              >
                Error
              </Button>
              <Button
                onClick={() => show({ message: "Success", variant: "success" })}
              >
                Success
              </Button>
            </div>
          );
        })()}
      </ToastProvider>
    );
  },
};
