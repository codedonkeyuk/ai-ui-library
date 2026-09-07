import { test, describe, before, after } from "node:test";
import * as assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { settings } from "./model-settings.ts";
import createModelConfig from "./createModelConfig.ts";

describe("createModelConfig comprehensive component extraction pipeline", () => {
  let tempDir: string;
  let originalCwd: () => string;

  before(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "component-lib-test-"));
    const distPath = path.join(tempDir, "dist");
    fs.mkdirSync(distPath, { recursive: true });

    originalCwd = process.cwd;
    process.cwd = () => tempDir;

    // Simulate exactly what your real bundled dist/index.d.mts output file looks like
    const mockDtsContent = `
      /** Global Dialog Layout */
      export interface DialogProps { isOpen: boolean; onClose: () => void; }
      export type MainNavigationProps = { links: NavigationLink[]; main?: boolean; };
      //#region inner component layout
      interface ComplexProps { id: string; variant?: "primary" | "secondary"; size: "sm" | "md" | "lg"; }
      //#endregion
      //# sourceMappingURL=index.d.mts.map
    `;

    fs.writeFileSync(path.join(distPath, "index.d.mts"), mockDtsContent);
  });

  after(() => {
    process.cwd = originalCwd;
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  test("extracts values perfectly matching the configuration object keys", () => {
    const config = createModelConfig();

    assert.equal(config.baseModel, settings.from);
    assert.equal(config.parameters.temperature, settings.temperature);
    assert.equal(config.parameters.top_p, settings.top_p);
    assert.equal(config.parameters.stop, `[${settings.stop}]`);
    assert.equal(config.systemSettings, settings.system.trim());
  });

  test("captures and minifies the declaration inventory into a valid flat string", () => {
    const config = createModelConfig();
    const inventory = config.componentInventory;

    // 1. Core verification: Ensure everything is forced onto a single flat line
    assert.ok(
      !inventory.includes("\n"),
      "Should completely flatten all newlines",
    );
    assert.ok(
      !inventory.includes("\t"),
      "Should completely drop all tab breaks",
    );

    // 2. Core verification: Verify comments and toolchain maps are stripped out cleanly
    assert.ok(
      !inventory.includes("Global Dialog Layout"),
      "Should strip multi-line JSDoc blocks",
    );
    assert.ok(
      !inventory.includes("#region"),
      "Should strip inner IDE layout comments",
    );
    assert.ok(
      !inventory.includes("sourceMappingURL"),
      "Should drop source mapping file comments",
    );

    // 3. Core verification: Ensure the absolute syntax contracts survive the minification filter intact
    assert.ok(
      inventory.includes("export interface DialogProps"),
      "Dialog contracts must exist",
    );
    assert.ok(
      inventory.includes("export type MainNavigationProps"),
      "Navigation type shapes must exist",
    );
    assert.ok(
      inventory.includes('variant?: "primary" | "secondary"'),
      "Complex types must exist",
    );
  });
});
