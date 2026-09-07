import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Dialog from "./Dialog";
import Button from "./Button";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    html: {
      disable: true,
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const onClose = () => setOpen(false);

    return (
      <>
        <Dialog isOpen={open} onClose={onClose}>
          <h2>I am a HTML Dialog</h2>
          <p>
            This is a HTML dialog. A lot of projects still don't support these
            even though they offer better accessibility!
          </p>
          <div className="button-bar">
            <Button onClick={onClose}>Close</Button>
          </div>
        </Dialog>
        <p>
          <Button primary onClick={() => setOpen(!open)}>
            {open ? "Close" : "Open"} Dialog
          </Button>
        </p>
      </>
    );
  },
};
