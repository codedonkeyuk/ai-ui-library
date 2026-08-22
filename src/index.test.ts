import { test, describe } from "node:test";
import assert from "node:assert";
import * as Testee from "./index";

describe("Module Export Tests", () => {
  const assertExportIsValid = (moduleExport: any, name: string) => {
    assert.ok(moduleExport, `Export "${name}" should exist.`);
    const type = typeof moduleExport;
    const isValidType = type === "function" || type === "object";
    assert.ok(
      isValidType,
      `Expected "${name}" to be function/object, got "${type}".`,
    );
  };

  test("should have exactly the expected number of exports", () => {
    const exportNames = Object.keys(Testee);
    const EXPECTED_EXPORT_COUNT = 9;
    assert.strictEqual(
      exportNames.length,
      EXPECTED_EXPORT_COUNT,
      `Export count mismatch! Expected ${EXPECTED_EXPORT_COUNT}, but found ${exportNames.length} (${exportNames.join(", ")}). Did you forget to add a test for a new export?`,
    );
  });

  test("should successfully export the Loading component", () => {
    assertExportIsValid(Testee.Loading, "Loading");
  });
  test("should successfully export the ButtonBar component", () => {
    assertExportIsValid(Testee.ButtonBar, "ButtonBar");
  });
  test("should successfully export the LinkRouterButton component", () => {
    assertExportIsValid(Testee.LinkRouterButton, "LinkRouterButton");
  });
  test("should successfully export the Toast component", () => {
    assertExportIsValid(Testee.Toast, "Toast");
  });
  test("should successfully export the ToastProvider component", () => {
    assertExportIsValid(Testee.ToastProvider, "ToastProvider");
  });
  test("should successfully export the useToast component", () => {
    assertExportIsValid(Testee.useToast, "useToast");
  });
  test("should successfully export the ErrorBoundary component", () => {
    assertExportIsValid(Testee.ErrorBoundary, "ErrorBoundary");
  });
  test("should successfully export the ErrorPage component", () => {
    assertExportIsValid(Testee.ErrorPage, "ErrorPage");
  });
  test("should successfully export the handleJsError component", () => {
    assertExportIsValid(Testee.handleJsError, "handleJsError");
  });
});
