import { cleanup } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import assert from "node:assert/strict";
import test from "node:test";

import Input from "./Input";

test.afterEach(() => {
  cleanup();
});

const inputCases = [
  { type: "text", role: "textbox" },
  { type: "email", role: "textbox" },
  { type: "password", role: null },
  { type: "search", role: "searchbox" },
  { type: "tel", role: "textbox" },
  { type: "url", role: "textbox" },
  { type: "number", role: "spinbutton" },
  { type: "date", role: null },
  { type: "datetime-local", role: null },
  { type: "month", role: null },
  { type: "time", role: null },
  { type: "week", role: null },
  { type: "checkbox", role: "checkbox" },
  { type: "radio", role: "radio" },
  { type: "range", role: "slider" },
  { type: "color", role: null },
  { type: "file", role: null },
  { type: "hidden", role: null },
];

for (const { type, role } of inputCases) {
  test(`renders input type="${type}"`, () => {
    render(
      <Input
        id={`input-${type}`}
        name={`input-${type}`}
        type={type}
        label={`${type} field`}
      />,
    );

    const input =
      type === "hidden"
        ? document.getElementById(`input-${type}`)
        : screen.getByLabelText(`${type} field`);

    assert.ok(input);
    assert.equal(input?.getAttribute("type"), type);

    if (role) {
      assert.ok(screen.getByRole(role, { name: `${type} field` }));
    }
  });
}

test("associates the warning with the input via dynamic ID", () => {
  render(
    <Input
      id="email"
      name="email"
      type="email"
      label="Email"
      warningMessage="Please enter a valid email address."
    />,
  );

  const input = screen.getByRole("textbox", { name: "Email" });
  const warning = screen.getByText("Please enter a valid email address.");

  assert.equal(
    input.getAttribute("aria-describedby"),
    warning.getAttribute("id"),
  );
  assert.equal(warning.getAttribute("role"), "alert");
});

test("associates the description with the input via dynamic ID", () => {
  render(
    <Input
      id="username"
      name="username"
      type="text"
      label="Username"
      description="Optional field"
    />,
  );

  const input = screen.getByRole("textbox", { name: "Username" });
  const description = screen.getByText("Optional field");

  assert.equal(
    input.getAttribute("aria-describedby"),
    description.getAttribute("id"),
  );
});

test("associates both description and warning with the input", () => {
  render(
    <Input
      id="email"
      name="email"
      type="email"
      label="Email"
      description="Optional field"
      warningMessage="Please enter a valid email address."
    />,
  );

  const input = screen.getByRole("textbox", { name: "Email" });
  const description = screen.getByText("Optional field");
  const warning = screen.getByText("Please enter a valid email address.");

  const describedBy = input.getAttribute("aria-describedby");
  assert.ok(
    describedBy !== null,
    "aria-describedby attribute should not be null",
  );

  assert.ok(describedBy.includes(description.getAttribute("id") || ""));
  assert.ok(describedBy.includes(warning.getAttribute("id") || ""));
});

test("passes through standard HTML attributes", () => {
  render(
    <Input
      id="standard-props"
      name="standard-props"
      type="text"
      label="Standard Props"
      placeholder="Enter your name"
      disabled={true}
      autoComplete="off"
    />,
  );

  const input = screen.getByRole("textbox", { name: "Standard Props" });

  assert.equal(input.getAttribute("placeholder"), "Enter your name");
  assert.equal(input.getAttribute("disabled"), "true");
  assert.equal(input.getAttribute("autocomplete"), "off");
});

test("handles interaction events", async () => {
  let onInputChangeCalled = false;
  let onFocusChangeCalled = false;

  const onInputChange = () => {
    onInputChangeCalled = true;
  };
  const onFocusChange = () => {
    onFocusChangeCalled = true;
  };

  render(
    <Input
      id="events"
      name="events"
      type="text"
      label="Events"
      onChange={onInputChange}
      onFocus={onFocusChange}
    />,
  );

  const input = screen.getByRole("textbox", { name: "Events" });

  await userEvent.click(input);
  assert.strictEqual(
    onFocusChangeCalled,
    true,
    "onFocus should have been called",
  );

  await userEvent.type(input, "hello");
  assert.strictEqual(
    onInputChangeCalled,
    true,
    "onChange should have been called",
  );
});
