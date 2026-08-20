import { describe, it } from "node:test";
import assert from "node:assert";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading.tsx";

describe("Loading Component", () => {
  it("renders the spinner with correct accessibility roles and labels", () => {
    render(<Loading />);

    const spinner = screen.getByRole("status", { name: /loading/i });

    assert.ok(spinner, "Spinner element should be in the DOM");
  });

  it("applies the correct CSS classes for your shared stylesheet", () => {
    const { container } = render(<Loading />);

    const containerDiv = container.querySelector(".spinner-container");
    assert.ok(containerDiv, "Container div should exist");
    assert.strictEqual(containerDiv.className, "spinner-container");

    const spinnerDiv = container.querySelector(".loading-spinner");
    assert.ok(spinnerDiv, "Spinner div should exist");
    assert.strictEqual(spinnerDiv.className, "loading-spinner");
  });
});
