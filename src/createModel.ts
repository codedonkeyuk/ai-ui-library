import * as fs from "node:fs";
import * as path from "node:path";
import { settings } from "./model-settings.ts";

/**
 * Traverses a directory recursively to grab valid component source files.
 * Explicitly ignores build artifacts, tests, and stories.
 */
function getFilesRecursive(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();

    if (isDirectory) {
      const baseFolder = path.basename(name).toLowerCase();
      if (
        baseFolder === "dist" ||
        baseFolder === "build" ||
        baseFolder === "node_modules"
      ) {
        continue;
      }
      getFilesRecursive(name, fileList);
    } else {
      const isTargetExtension = /\.(ts|tsx)$/.test(file);
      const isTestOrStory =
        file.includes(".stories.") || file.includes(".test.");

      if (isTargetExtension && !isTestOrStory) {
        fileList.push(name);
      }
    }
  }
  return fileList;
}

/**
 * Cleanly extracts only components and their types based on clean structural text blocks.
 */
function extractComponentBlueprints(srcPath: string): string {
  const files = getFilesRecursive(srcPath);
  let context = "";

  for (const filePath of files) {
    const rawCode = fs.readFileSync(filePath, "utf8");
    const fileName = path.basename(filePath);
    const componentName = path.basename(filePath, path.extname(filePath));

    if (fileName === "index.ts" || fileName === "setupTests.ts") continue;

    let extractedPropsBlock = "";
    let detectedPropsName = "Props"; // Safe universal fallback

    const lines = rawCode.split("\n");
    let captureMode = false;
    let bracketCount = 0;

    for (const line of lines) {
      const trimmed = line.trim();

      if (
        (trimmed.startsWith("export interface ") ||
          trimmed.startsWith("interface ") ||
          trimmed.startsWith("export type ") ||
          trimmed.startsWith("type ")) &&
        trimmed.includes("{")
      ) {
        const match = trimmed.match(/(?:interface|type)\s+(\w+)/);
        if (match) {
          const currentTypeName = match[1];

          // CRITICAL FILTER: Only capture if it's explicitly 'Props' or ends with 'Props'
          // This stops 'State' or internal definitions from hijacking the component signature
          if (
            currentTypeName === "Props" ||
            currentTypeName.endsWith("Props")
          ) {
            captureMode = true;
            detectedPropsName = currentTypeName;
          }
        }
      }

      if (captureMode) {
        extractedPropsBlock += line + "\n";

        bracketCount += (line.match(/\{/g) || []).length;
        bracketCount -= (line.match(/\}/g) || []).length;

        if (bracketCount === 0) {
          captureMode = false;
          extractedPropsBlock += "\n";
        }
      }
    }

    if (extractedPropsBlock.trim()) {
      context += `### Package element from simple-component-library (${fileName}):\n\`\`\`typescript\n`;
      context += extractedPropsBlock.trim() + "\n\n";
      context += `// Exported Available Component\n`;
      context += `export const ${componentName}: React.FC<${detectedPropsName}>;\n`;
      context += `\`\`\`\n\n`;
    }
  }

  return context.trim();
}

const createModel = (): string => {
  const componentWorkspaceSrc = path.resolve(
    process.cwd(),
    "packages/simple-component-library/src",
  );
  const componentBlueprints = extractComponentBlueprints(componentWorkspaceSrc);

  const fullSystemPrompt = `
${settings.system.trim()}

## Available Components Inventory:
You are strictly allowed to output layouts using ONLY the components declared in this inventory list. Never use generic HTML strings or unlisted elements:

${componentBlueprints}
`.trim();

  return `
FROM ${settings.from}

PARAMETER temperature ${settings.temperature}
PARAMETER top_p ${settings.top_p}
PARAMETER stop "[${settings.stop}]"
SYSTEM """
${fullSystemPrompt}
"""
`.trim();
};

export default createModel;
