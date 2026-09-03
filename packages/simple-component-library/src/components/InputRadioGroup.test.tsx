import test, { afterEach } from "node:test";
import assert from "node:assert/strict";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import InputRadioGroup, { updateRadioArray } from "./InputRadioGroup";

afterEach(() => {
  cleanup();
});

test("updateRadioArray selects the matching radio and deselects the others", () => {
  const radios = [
    { id: "one", label: "One", selected: true },
    { id: "two", label: "Two", selected: false },
    { id: "three", label: "Three", selected: false },
  ];

  const result = updateRadioArray(radios, "two");

  assert.deepEqual(result, [
    { id: "one", label: "One", selected: false },
    { id: "two", label: "Two", selected: true },
    { id: "three", label: "Three", selected: false },
  ]);
});

test("updateRadioArray returns a new array without mutating the original", () => {
  const radios = [
    { id: "one", label: "One", selected: false },
    { id: "two", label: "Two", selected: false },
  ];

  const result = updateRadioArray(radios, "one");

  assert.notStrictEqual(result, radios);

  assert.deepEqual(radios, [
    { id: "one", label: "One", selected: false },
    { id: "two", label: "Two", selected: false },
  ]);
});

test("InputRadioGroup renders the legend, labels, and radio buttons", () => {
  render(
    <InputRadioGroup
      legend="Choose one"
      radios={[
        { id: "one", label: "One", selected: true },
        { id: "two", label: "Two", selected: false },
      ]}
      radioSelected={() => {}}
    />,
  );

  assert.equal(screen.getByText("Choose one").textContent, "Choose one");

  const one = screen.getByLabelText("One") as HTMLInputElement;
  const two = screen.getByLabelText("Two") as HTMLInputElement;

  assert.equal(one.type, "radio");
  assert.equal(two.type, "radio");
  assert.equal(one.checked, true);
  assert.equal(two.checked, false);
});

test("InputRadioGroup calls radioSelected with the selected radio ID", () => {
  let selectedId: string | undefined;

  render(
    <InputRadioGroup
      legend="Choose one"
      radios={[
        { id: "one", label: "One", selected: false },
        { id: "two", label: "Two", selected: false },
      ]}
      radioSelected={(id) => {
        selectedId = id;
      }}
    />,
  );

  fireEvent.click(screen.getByLabelText("Two"));

  assert.equal(selectedId, "two");
});

test("all radios have the same name", () => {
  render(
    <InputRadioGroup
      legend="Choose one"
      radios={[
        { id: "one", label: "One", selected: false },
        { id: "two", label: "Two", selected: false },
      ]}
      radioSelected={() => {}}
    />,
  );

  const one = screen.getByLabelText("One") as HTMLInputElement;
  const two = screen.getByLabelText("Two") as HTMLInputElement;

  assert.equal(one.name, two.name);
  assert.notEqual(one.name, "");
});
