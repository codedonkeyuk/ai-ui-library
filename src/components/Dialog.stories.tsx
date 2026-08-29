import type { Meta, StoryObj } from "@storybook/react";
import type { JSX } from "react/jsx-runtime";
import { useState } from "react";
import Dialog from "./Dialog";

const TestDialog = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog isOpen={open} onClose={onClose}>
        <h2>I am a HTML Dialog</h2>
        <p>
          This is a HTML dialog. A lot of projects still don't support these
          even though they offer better accessibility!
        </p>
        <div className="button-bar">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </Dialog>
      <p>
        <button
          className="btn"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Open Dialog
        </button>
      </p>
    </>
  );
};

const meta: Meta<typeof TestDialog> = {
  title: "Components/Dialog",
  component: TestDialog,
  parameters: {
    layout: "centered",
    html: {
      disable: true,
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (): React.JSX.Element => <TestDialog />,
};
