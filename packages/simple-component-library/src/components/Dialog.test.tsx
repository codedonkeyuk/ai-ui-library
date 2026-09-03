import test, { describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert";
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import Dialog from "./Dialog.tsx";

describe("Dialog Component", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute("open");
    };
  });

  afterEach(() => {
    cleanup();
  });

  test("should render children when open", () => {
    render(
      <Dialog isOpen={true} onClose={() => {}}>
        <div>Dialog Content</div>
      </Dialog>,
    );

    const content = screen.getByText("Dialog Content");
    assert.ok(content);

    const dialog = content.closest("dialog");
    assert.strictEqual(dialog?.hasAttribute("open"), true);
  });

  test("should not have open attribute when isOpen is false", () => {
    render(
      <Dialog isOpen={false} onClose={() => {}}>
        <div>Dialog Content</div>
      </Dialog>,
    );

    const dialog = screen.getByText("Dialog Content").closest("dialog");
    assert.strictEqual(dialog?.hasAttribute("open"), false);
  });

  test("should trigger onClose when the native HTML close event fires", () => {
    let called = false;
    const handleClose = () => {
      called = true;
    };

    render(
      <Dialog isOpen={true} onClose={handleClose}>
        <div>Dialog Content</div>
      </Dialog>,
    );

    const dialog = screen.getByText("Dialog Content").closest("dialog");
    assert.ok(dialog);

    fireEvent.drop(dialog);
    fireEvent(dialog, new Event("close"));

    assert.strictEqual(called, true);
  });
});
