import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Pills from "./Pills";

describe("Pills Component", () => {
  afterEach(() => {
    cleanup();
  });

  const mockItems = [
    { id: 1, label: "React", selected: true },
    { id: 2, label: "TypeScript", selected: false },
    { id: "3", label: "Styled Components", selected: false },
  ];

  it("renders all pill items with correct labels", () => {
    render(<Pills items={mockItems} onChange={() => {}} />);

    mockItems.forEach((item) => {
      const button = screen.getByRole("button", { name: item.label });
      assert.ok(button, `Button for ${item.label} should be in the DOM`);
    });
  });

  it("applies the correct aria-pressed attribute based on selection state", () => {
    render(<Pills items={mockItems} onChange={() => {}} />);

    const firstButton = screen.getByRole("button", { name: "React" });
    const secondButton = screen.getByRole("button", { name: "TypeScript" });

    assert.strictEqual(firstButton.getAttribute("aria-pressed"), "true");
    assert.strictEqual(secondButton.getAttribute("aria-pressed"), "false");
  });

  it("calls onChange with the correct id when a pill is clicked", () => {
    let calledWithId: string | number | null = null;
    let callCount = 0;

    const mockOnChange = (id: string | number) => {
      calledWithId = id;
      callCount++;
    };

    render(<Pills items={mockItems} onChange={mockOnChange} />);

    const secondButton = screen.getByRole("button", { name: "TypeScript" });
    fireEvent.click(secondButton);

    assert.strictEqual(callCount, 1, "onChange should be called exactly once");
    assert.strictEqual(
      calledWithId,
      2,
      "onChange should be called with item id 2",
    );
  });
});
