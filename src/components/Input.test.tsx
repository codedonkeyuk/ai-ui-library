// Input.test.tsx
import test from "node:test";
import assert from "node:assert/strict";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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
        ? document.querySelector(`#input-${type}`)
        : screen.getByLabelText(`${type} field`);

    assert.ok(input);
    assert.equal(input.getAttribute("type"), type);

    if (role) {
      assert.equal(input.getAttribute("role"), null);
      assert.equal(screen.getByRole(role, { name: `${type} field` }), input);
    }
  });
}

test("associates the warning with the input", () => {
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

  assert.equal(input.getAttribute("aria-describedby"), "email-warning");
  assert.equal(warning.getAttribute("id"), "email-warning");
  assert.equal(warning.getAttribute("role"), "status");
});

test("does not add aria-describedby without a warning", () => {
  render(<Input id="username" name="username" type="text" label="Username" />);

  const input = screen.getByRole("textbox", { name: "Username" });

  assert.equal(input.hasAttribute("aria-describedby"), false);
  assert.equal(screen.queryByRole("status"), null);
});

test("passes input events through", async () => {
  const user = userEvent.setup();

  const events = {
    change: 0,
    focus: 0,
    blur: 0,
    keydown: 0,
  };

  render(
    <Input
      id="username"
      name="username"
      type="text"
      label="Username"
      onChange={() => events.change++}
      onFocus={() => events.focus++}
      onBlur={() => events.blur++}
      onKeyDown={() => events.keydown++}
    />,
  );

  const input = screen.getByRole("textbox", { name: "Username" });

  await user.click(input);
  await user.type(input, "alex");
  await user.tab();

  assert.ok(events.focus > 0);
  assert.ok(events.change > 0);
  assert.ok(events.keydown > 0);
  assert.ok(events.blur > 0);
  assert.equal(input.getAttribute("value"), null);
  assert.equal((input as HTMLInputElement).value, "alex");
});

test("passes standard input props through", () => {
  render(
    <Input
      id="phone"
      name="phone"
      type="tel"
      label="Phone"
      placeholder="Enter your phone number"
      disabled
      autoComplete="tel"
    />,
  );

  const input = screen.getByRole("textbox", { name: "Phone" });

  assert.equal(input.getAttribute("placeholder"), "Enter your phone number");
  assert.equal(input.getAttribute("autocomplete"), "tel");
  assert.equal((input as HTMLInputElement).disabled, true);
});
