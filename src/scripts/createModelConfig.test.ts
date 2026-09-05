import { test, describe, before, after } from "node:test";
import * as assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { settings } from "./model-settings.ts";
import createModelConfig, {
  type ComponentBlueprint,
} from "./createModelConfig.ts";

describe("createModelConfig comprehensive component extraction pipeline", () => {
  let tempDir: string;
  let originalCwd: () => string;

  before(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "component-lib-test-"));
    const srcPath = path.join(tempDir, "src", "lib");
    fs.mkdirSync(srcPath, { recursive: true });

    originalCwd = process.cwd;
    process.cwd = () => tempDir;

    // 1. Standard Interface Layout
    const dialogCode = `
      export interface DialogProps {
        isOpen: boolean;
        onClose: () => void;
      }
    `;

    // 2. Type Alias with Spacing & Equals Sign (Fails basic regex)
    const navigationCode = `
      export type MainNavigationProps = {
        links: NavigationLink[];
        main?: boolean;
      };
    `;

    // 3. Multi-line spacing and comments inside the block (Fails line-by-line cutting)
    const complexCode = `
      interface ComplexProps {
        // Core Identifier
        id: string;

        /* Visual look and feel */
        variant?: "primary" | "secondary";
        
        size: "sm" | "md" | "lg";
      }
    `;

    fs.writeFileSync(path.join(srcPath, "Dialog.tsx"), dialogCode);
    fs.writeFileSync(path.join(srcPath, "MainNavigation.tsx"), navigationCode);
    fs.writeFileSync(path.join(srcPath, "ComplexComponent.tsx"), complexCode);

    // Artifacts that must be ignored
    fs.writeFileSync(
      path.join(srcPath, "Dialog.stories.tsx"),
      "interface StoryProps {}",
    );
    fs.writeFileSync(
      path.join(srcPath, "Dialog.test.tsx"),
      "interface TestProps {}",
    );
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

  test("captures every single valid component regardless of formatting variations", () => {
    const config = createModelConfig();
    const inventory: ComponentBlueprint[] = JSON.parse(
      config.componentInventory,
    );

    // Assert that all 3 components are found (was failing at 2)
    assert.equal(
      inventory.length,
      3,
      "Pipeline must capture all three unique structural component configurations",
    );

    // 1. Verify standard interface extraction
    const dialog = inventory.find((item) => item.component === "Dialog");
    assert.ok(dialog, "Should find Dialog component");
    assert.deepEqual(dialog.props.isOpen, { type: "boolean", required: true });

    // 2. Verify type alias assignment with equals sign extraction
    const nav = inventory.find((item) => item.component === "MainNavigation");
    assert.ok(nav, "Should find MainNavigation type alias component");
    assert.deepEqual(nav.props.links, {
      type: "NavigationLink[]",
      required: true,
    });
    assert.deepEqual(nav.props.main, { type: "boolean", required: false });

    // 3. Verify multi-line, comment-insulated block extraction
    const complex = inventory.find(
      (item) => item.component === "ComplexComponent",
    );
    assert.ok(
      complex,
      "Should scan past formatting blocks to isolate complex property profiles",
    );
    assert.deepEqual(complex.props.id, { type: "string", required: true });
    assert.deepEqual(complex.props.variant, {
      type: '"primary" | "secondary"',
      required: false,
    });
    assert.deepEqual(complex.props.size, {
      type: '"sm" | "md" | "lg"',
      required: true,
    });
  });

  test("filters toolchain noise like stories and unit test files out completely", () => {
    const config = createModelConfig();
    const inventory: ComponentBlueprint[] = JSON.parse(
      config.componentInventory,
    );

    const hasStories = inventory.some((item) =>
      item.component.toLowerCase().includes("story"),
    );
    const hasTests = inventory.some((item) =>
      item.component.toLowerCase().includes("test"),
    );

    assert.equal(
      hasStories,
      false,
      "Should completely exclude design story files",
    );
    assert.equal(
      hasTests,
      false,
      "Should completely drop component verification test blocks",
    );
  });
});
