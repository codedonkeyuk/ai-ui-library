import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, it, expect } from "vitest";

describe("App Component", () => {
  it("renders the expected text", () => {
    render(<App />);
    expect(
      screen.getByText(/Hello, React \+ TypeScript \+ Vite!/i),
    ).toBeInTheDocument();
  });
});
