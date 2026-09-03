import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import InputCheckboxGroup, {
  updateCheckboxArray,
} from "./InputCheckboxGroup.tsx";

type Checkbox = {
  id: string;
  label: string;
  selected: boolean;
};

afterEach(() => {
  cleanup();
});

test("updateCheckboxArray updates the matching checkbox", () => {
  const checkboxes: Checkbox[] = [
    { id: "one", label: "One", selected: false },
    { id: "two", label: "Two", selected: false },
  ];

  const result = updateCheckboxArray(checkboxes, "two", true);

  assert.deepEqual(result, [
    { id: "one", label: "One", selected: false },
    { id: "two", label: "Two", selected: true },
  ]);
});

test("updateCheckboxArray returns a new array without mutating the original", () => {
  const checkboxes: Checkbox[] = [{ id: "one", label: "One", selected: false }];

  const result = updateCheckboxArray(checkboxes, "one", true);

  assert.notStrictEqual(result, checkboxes);
  assert.deepEqual(checkboxes, [{ id: "one", label: "One", selected: false }]);
});

test("InputCheckboxGroup renders the legend and checkboxes", () => {
  const checkboxes: Checkbox[] = [
    { id: "one", label: "One", selected: false },
    { id: "two", label: "Two", selected: true },
  ];

  render(
    <InputCheckboxGroup
      legend="Options"
      checkboxes={checkboxes}
      checkboxSelected={() => {}}
    />,
  );

  assert.equal(screen.getByText("Options").textContent, "Options");

  const firstCheckbox = screen.getByLabelText("One") as HTMLInputElement;
  const secondCheckbox = screen.getByLabelText("Two") as HTMLInputElement;

  assert.equal(firstCheckbox.checked, false);
  assert.equal(secondCheckbox.checked, true);
});

test("InputCheckboxGroup calls checkboxSelected when a checkbox changes", () => {
  const checkboxes: Checkbox[] = [{ id: "one", label: "One", selected: false }];

  let receivedId: string | undefined;
  let receivedSelected: boolean | undefined;

  render(
    <InputCheckboxGroup
      legend="Options"
      checkboxes={checkboxes}
      checkboxSelected={(id, selected) => {
        receivedId = id;
        receivedSelected = selected;
      }}
    />,
  );

  const checkbox = screen.getByLabelText("One");

  fireEvent.click(checkbox);

  assert.equal(receivedId, "one");
  assert.equal(receivedSelected, true);
});
