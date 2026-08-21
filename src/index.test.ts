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
    const EXPECTED_EXPORT_COUNT = 2;
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
});
