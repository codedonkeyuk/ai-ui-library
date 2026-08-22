import { describe, it } from "node:test";
import assert from "node:assert";
import { render, screen } from "@testing-library/react";
import { ErrorPage, handleJsError } from "./ErrorTemplates.tsx";

describe("ErrorTemplates", () => {
  it("should render the error message correctly", () => {
    const testError = new Error("Test error message");
    render(<ErrorPage error={testError} />);

    const heading = screen.getByRole("heading", {
      name: /500 - Internal Error/i,
    });
    assert.ok(heading, "Heading should be visible");
    assert.strictEqual(heading.textContent, "500 - Internal Error");

    const paragraph = screen.getByText("Test error message");
    assert.ok(paragraph, "Error message should be visible");
  });

  it("should set the innerHTML of a target element when handleJsError is called", () => {
    const testError = new Error("JavaScript error");
    const target = document.createElement("div");

    handleJsError(testError, target);

    assert.strictEqual(
      target.innerHTML,
      `
  <div class="error-container">
    <div class="error-info">
      <h1>500 - Internal Error</h1>
      <p>
        JavaScript error
      </p>
    </div>
  </div>`,
    );
  });
});
