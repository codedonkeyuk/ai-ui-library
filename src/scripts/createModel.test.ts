import { test, describe, before, after } from "node:test";
import * as assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import createModel from "./createModel.ts";

describe("createModel generation pipeline", () => {
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

  test("compiles a valid Modelfile system prompt matching component interfaces", async () => {
    const result = await createModel();

    assert.match(
      result,
      /FROM\s+[\w-:]+/i,
      "Should declare a base LLM parent layer (FROM)",
    );
    assert.match(
      result,
      /PARAMETER temperature \d\.\d/,
      "Should configure temperature guidelines",
    );
    assert.match(
      result,
      /PARAMETER stop "\[\w+\]"/,
      "Should output accurate completion stop rules",
    );

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

  test("ignores non-component tooling like stories and test files", async () => {
    const result = await createModel();

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
