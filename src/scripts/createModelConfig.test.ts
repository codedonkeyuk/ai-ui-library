import { test, describe, before, after } from "node:test";
import * as assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import createModelConfig from "./createModelConfig.ts";

describe("createModelConfig generation pipeline", () => {
  let tempDir: string;
  let originalCwd: () => string;

  before(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "component-lib-test-"));
    const srcPath = path.join(tempDir, "src", "lib");
    fs.mkdirSync(srcPath, { recursive: true });

    originalCwd = process.cwd;
    process.cwd = () => tempDir;

    const mockComponentCode = `
      interface MockProps {
        title: string;
        disabled?: boolean;
      }
    `;
    fs.writeFileSync(
      path.join(srcPath, "MockComponent.tsx"),
      mockComponentCode,
    );
    fs.writeFileSync(
      path.join(srcPath, "Button.tsx"),
      "interface ButtonProps { label: string; }",
    );
    fs.writeFileSync(
      path.join(srcPath, "Button.stories.tsx"),
      "interface StoryProps {}",
    );
    fs.writeFileSync(
      path.join(srcPath, "Button.test.tsx"),
      "interface TestProps {}",
    );
  });

  after(() => {
    process.cwd = originalCwd;
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  test("compiles a valid model config object matching component interfaces", () => {
    const config = createModelConfig();

    // Verify root-level structural configuration object properties
    assert.ok(
      config.baseModel,
      "Should provide a base LLM parent layer (baseModel)",
    );
    assert.equal(
      typeof config.parameters.temperature,
      "number",
      "Should configure temperature guidelines as a number",
    );
    assert.match(
      config.parameters.stop,
      /^\[\w+\]$/,
      "Should output accurate completion stop rules with brackets",
    );
    assert.equal(
      typeof config.systemSettings,
      "string",
      "Should contain system setting instructions",
    );

    // Verify component configuration details inside the inventory text
    const result = config.componentInventory;
    assert.match(
      result,
      /### Package element from simple-component-library \(MockComponent\.tsx\):/,
      "Should isolate custom file headings",
    );
    assert.match(
      result,
      /interface MockProps \{[\s\S]*?\}/,
      "Should capture bracketed props parameters",
    );
    assert.match(
      result,
      /export const MockComponent: React\.FC<MockProps>;/,
      "Should synthesize component signature",
    );
  });

  test("ignores non-component tooling like stories and test files", () => {
    const config = createModelConfig();
    const result = config.componentInventory;

    assert.match(
      result,
      /Package element from simple-component-library \(Button\.tsx\)/,
      "Should map primary components",
    );
    assert.equal(
      result.includes("Button.stories.tsx"),
      false,
      "Should completely drop story file blocks",
    );
    assert.equal(
      result.includes("Button.test.tsx"),
      false,
      "Should completely drop test file blocks",
    );
  });
});
