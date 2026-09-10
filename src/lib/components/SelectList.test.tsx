import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import assert from "node:assert/strict";
import test, { describe } from "node:test";
import React from "react";
import SelectList from "./SelectList.tsx";

test.afterEach(() => {
  cleanup();
});

const noop = () => {};

describe("SelectList Component", () => {
  test("renders label and children options correctly", () => {
    render(
      <SelectList
        id="country"
        name="country"
        label="Choose Country"
        value="uk"
        onChange={noop}
      >
        <option value="uk">United Kingdom</option>
        <option value="us">United States</option>
      </SelectList>,
    );

    const label = screen.getByLabelText("Choose Country");
    assert.ok(label);

    const optionUk = screen.getByRole("option", { name: "United Kingdom" });
    assert.strictEqual(optionUk.getAttribute("value"), "uk");
  });

  test("applies the required controlled value accurately", () => {
    render(
      <SelectList
        id="country"
        name="country"
        label="Choose Country"
        value="us"
        onChange={noop}
      >
        <option value="uk">United Kingdom</option>
        <option value="us">United States</option>
      </SelectList>,
    );

    const selectEl = screen.getByRole("combobox", {
      name: "Choose Country",
    }) as HTMLSelectElement;

    assert.strictEqual(selectEl.value, "us");
  });

  test("triggers the mandatory onChange handler when a selection occurs", async () => {
    const user = userEvent.setup();
    let updatedValue = "";

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      updatedValue = e.target.value;
    };

    render(
      <SelectList
        id="country"
        name="country"
        label="Choose Country"
        value="uk"
        onChange={handleChange}
      >
        <option value="uk">United Kingdom</option>
        <option value="us">United States</option>
      </SelectList>,
    );

    const selectEl = screen.getByRole("combobox", {
      name: "Choose Country",
    }) as HTMLSelectElement;

    await user.selectOptions(selectEl, "us");

    assert.strictEqual(updatedValue, "us");
  });

  test("links description and warning elements via aria-describedby", () => {
    render(
      <SelectList
        id="country"
        name="country"
        label="Choose Country"
        value="uk"
        onChange={noop}
        description="Select your home region"
        warningMessage="This field is invalid"
      >
        <option value="uk">United Kingdom</option>
      </SelectList>,
    );

    const selectEl = screen.getByRole("combobox", { name: "Choose Country" });
    const ariaDescribedBy = selectEl.getAttribute("aria-describedby");

    assert.ok(ariaDescribedBy?.includes("country-description"));
    assert.ok(ariaDescribedBy?.includes("country-error"));

    assert.strictEqual(selectEl.getAttribute("aria-invalid"), "true");
  });

  test("applies mandatory attributes natively when required is true", () => {
    render(
      <SelectList
        id="country"
        name="country"
        label="Choose Country"
        value="uk"
        onChange={noop}
        required
      >
        <option value="uk">United Kingdom</option>
      </SelectList>,
    );

    const selectEl = screen.getByRole("combobox", { name: "Choose Country" });

    assert.strictEqual(selectEl.hasAttribute("required"), true);
    assert.strictEqual(selectEl.getAttribute("aria-required"), "true");
  });
});
