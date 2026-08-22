import { describe, it } from "node:test";
import assert from "node:assert";
import ReactDOM from "react-dom/client";
import { act } from "react";
import Toast from "./Toast.tsx";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Toast Component", () => {
  it("should not render when isVisible is false", async () => {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(<Toast isVisible={false} message="Test" />);
    });

    assert.strictEqual(container.firstChild, null);
  });

  it("should render when isVisible is true", async () => {
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(<Toast isVisible={true} message="Test" />);
    });

    assert.notStrictEqual(container.firstChild, null);
    assert.match(container.textContent || "", /Test/);
  });

  it("should call onClose after the specified duration", async () => {
    const container = document.createElement("div");
    const duration = 100;
    let called = false;

    const root = ReactDOM.createRoot(container);

    await act(async () => {
      root.render(
        <Toast
          isVisible={true}
          message="Test"
          duration={duration}
          onClose={() => {
            called = true;
          }}
        />,
      );
    });

    await act(async () => {
      await sleep(duration + 50);
    });

    assert.strictEqual(called, true);
  });
});
