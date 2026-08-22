import type { Meta, StoryObj } from "@storybook/react";
import type { JSX } from "react/jsx-runtime";
import ErrorBoundary from "./ErrorBoundary.tsx";
import { useState } from "react";

const TestErrorBoundary = (): JSX.Element => {
  const [, setError] = useState<Error | null>(null);

  return (
    <>
      <p>
        <button
          className="btn"
          onClick={() => {
            setError(() => {
              throw new Error("Hello World");
            });
          }}
        >
          Throw Error
        </button>
      </p>
    </>
  );
};

const meta: Meta<typeof TestErrorBoundary> = {
  title: "Components/ErrorBoundary",
  component: TestErrorBoundary,
  decorators: [
    (Story) => (
      <ErrorBoundary>
        <Story />
      </ErrorBoundary>
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
  render: (): React.JSX.Element => <TestErrorBoundary />,
};
