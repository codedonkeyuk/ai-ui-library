import type { Meta, StoryObj } from "@storybook/react";
import type { JSX } from "react/jsx-runtime";
import ErrorBoundary from "./ErrorBoundary.tsx";
import { useState } from "react";

const ErrorTrigger = (): JSX.Element => {
  const [, setError] = useState<Error | null>(null);

  return (
    <div>
      <p>Click the button to simulate a crash:</p>
      <button
        className="btn"
        onClick={() => {
          setError(() => {
            throw new Error("Simulated Crash: Hello World");
          });
        }}
      >
        Throw Error
      </button>
    </div>
  );
};

const meta: Meta<typeof ErrorBoundary> = {
  title: "Components/ErrorBoundary",
  component: ErrorBoundary,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    html: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <ErrorTrigger />
    </ErrorBoundary>
  ),
};
