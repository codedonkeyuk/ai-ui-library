import { describe, it } from "node:test";
import assert from "node:assert";
import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary.tsx";

const ThrowingComponent = () => {
  throw new Error("Test Error");
};

describe("ErrorBoundary", () => {
  it("renders children when no error is present", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>,
    );

    const child = screen.getByTestId("child");
    assert.ok(child, "Child component should be visible");
    assert.strictEqual(child.textContent, "Child Component");
  });

  it("catches errors and renders ErrorPage", () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>,
    );

    const heading = screen.getByRole("heading", {
      name: /500 - Internal Error/i,
    });
    assert.ok(heading, "ErrorPage heading should be visible");

    const errorText = screen.getByText("Test Error");
    assert.ok(errorText, "Error message should be visible in the ErrorPage");
  });
});
