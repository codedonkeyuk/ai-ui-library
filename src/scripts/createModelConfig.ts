import * as fs from "node:fs";
import * as path from "node:path";
import { settings } from "./model-settings.ts";

export interface ComponentProperty {
  type: string;
  required: boolean;
}

export interface ComponentBlueprint {
  component: string;
  props: Record<string, ComponentProperty>;
}

export interface ModelConfig {
  baseModel: string;
  parameters: {
    temperature: number;
    top_p: number;
    stop: string;
  };
  systemSettings: string;
  componentInventory: string;
}

function getFilesRecursive(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();

    if (isDirectory) {
      const baseFolder = path.basename(name).toLowerCase();
      if (["dist", "build", "node_modules"].includes(baseFolder)) continue;
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
 * Robust line-by-line block extractor.
 * Correctly captures every component regardless of spacing, comments, or syntax variations.
 */
function extractComponentBlueprints(srcPath: string): ComponentBlueprint[] {
  const files = getFilesRecursive(srcPath);
  const blueprints: ComponentBlueprint[] = [];

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    const componentName = path.basename(filePath, path.extname(filePath));

    if (fileName === "index.ts" || fileName === "setupTests.ts") continue;

    const sourceCode = fs.readFileSync(filePath, "utf8");
    const props: Record<string, ComponentProperty> = {};
    const lines = sourceCode.split("\n");

    let insideTargetBlock = false;
    let braceDepth = 0;

    for (const line of lines) {
      const trimmed = line.trim();

      // Detect the opening statement of the target type block safely
      if (!insideTargetBlock) {
        const isTypeOrInterface =
          trimmed.startsWith("export interface ") ||
          trimmed.startsWith("interface ") ||
          trimmed.startsWith("export type ") ||
          trimmed.startsWith("type ");

        if (
          isTypeOrInterface &&
          (trimmed.includes("Props") || trimmed.includes("Props="))
        ) {
          insideTargetBlock = true;
          braceDepth = 0;
        }
      }

      if (insideTargetBlock) {
        // Track true bracket depths to accurately capture full multi-line structures
        braceDepth += (line.match(/\{/g) || []).length;
        braceDepth -= (line.match(/\}/g) || []).length;

        // Skip structural wrapper lines, comments, or empty text signatures
        if (
          !trimmed ||
          trimmed.startsWith("//") ||
          trimmed.startsWith("/*") ||
          trimmed.startsWith("*") ||
          trimmed.includes("interface ") ||
          trimmed.includes("type ")
        ) {
          if (braceDepth <= 0) insideTargetBlock = false;
          continue;
        }

        // Parse explicit property keys (e.g., label: string; or active?: boolean;)
        const propMatch = trimmed.match(/^(\w+)(\?)?\s*:\s*(.+)$/);
        if (propMatch) {
          const [_, propName, isOptional, propType] = propMatch;
          // Clean up any lingering trailing semicolons or commas at the very end
          const cleanType = propType.replace(/[;,]$/, "").trim();

          props[propName] = {
            type: cleanType,
            required: !isOptional,
          };
        }

        if (braceDepth <= 0) {
          insideTargetBlock = false;
        }
      }
    }

    if (Object.keys(props).length > 0) {
      blueprints.push({
        component: componentName,
        props,
      });
    }
  }

  return blueprints;
}

const createModelConfig = (): ModelConfig => {
  const componentWorkspaceSrc = path.resolve(process.cwd(), "./src/lib");
  const componentBlueprints = extractComponentBlueprints(componentWorkspaceSrc);

  return {
    baseModel: settings.from,
    parameters: {
      temperature: settings.temperature,
      top_p: settings.top_p,
      stop: `[${settings.stop}]`,
    },
    systemSettings: settings.system.trim(),
    componentInventory: JSON.stringify(componentBlueprints, null, 2),
  };
};

export default createModelConfig;
