import { describe, it } from "node:test";
import assert from "node:assert";
import ReactDOM from "react-dom/client";
import { act } from "react";
import { ToastProvider, useToast } from "./ToastProvider.tsx";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const TestConsumer = () => {
  const { show } = useToast();
  return (
    <button
      id="trigger-toast"
      onClick={() => show({ message: "Provider Success", duration: 100 })}
    >
      Trigger
    </button>
  );
};

describe("ToastProvider & useToast", () => {
  it("should render children normally", async () => {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(
        <ToastProvider>
          <div id="child">Hello World</div>
        </ToastProvider>,
      );
    });

    const child = container.querySelector("#child");
    assert.notStrictEqual(child, null);
    assert.strictEqual(child?.textContent, "Hello World");
  });

  it("should mount and display a toast when show() is called", async () => {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(
        <ToastProvider>
          <TestConsumer />
        </ToastProvider>,
      );
    });

    const button = container.querySelector(
      "#trigger-toast",
    ) as HTMLButtonElement;

    await act(async () => {
      button.click();
    });

    assert.match(container.textContent || "", /Provider Success/);
  });

  it("should auto-remove the toast after its duration expires", async () => {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(
        <ToastProvider>
          <TestConsumer />
        </ToastProvider>,
      );
    });

    const button = container.querySelector(
      "#trigger-toast",
    ) as HTMLButtonElement;

    await act(async () => {
      button.click();
    });

    assert.match(container.textContent || "", /Provider Success/);

    await act(async () => {
      await sleep(150);
    });

    assert.strictEqual(
      container.textContent?.includes("Provider Success"),
      false,
    );
  });

  it("should throw an error if useToast is used outside of ToastProvider", async () => {
    const originalError = console.error;
    console.error = () => {};

    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    await assert.rejects(async () => {
      await act(async () => {
        root.render(<TestConsumer />);
      });
    }, /useToast must be used within a ToastProvider/);

    console.error = originalError;
  });
});
