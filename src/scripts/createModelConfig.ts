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

const createModelConfig = (): ModelConfig => {
  const dtsPath = path.resolve(process.cwd(), "dist/index.d.mts");

  let componentInventory = "";

  if (fs.existsSync(dtsPath)) {
    componentInventory = fs
      .readFileSync(dtsPath, "utf8")
      .trim()
      // Strip comments entirely to save token size
      .replace(/\/\*\*[\s\S]*?\*\//g, "") // Block comments
      .replace(/\/\/.*/g, "") // Single-line comments & source maps
      // Wipe out all real line breaks, carriage returns, and tabs
      .replace(/[\r\n\t]+/g, " ")
      // Collapse continuous layout whitespace down to a single space
      .replace(/\s+/g, " ")
      .trim();
  }

  return {
    baseModel: settings.from,
    parameters: {
      temperature: settings.temperature,
      top_p: settings.top_p,
      stop: `[${settings.stop}]`,
    },
    systemSettings: settings.system.trim(),
    componentInventory,
  };
};

export default createModelConfig;
