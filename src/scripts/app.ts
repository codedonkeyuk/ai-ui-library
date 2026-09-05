import { writeFile } from "node:fs/promises";
import createModelConfig from "./createModelConfig.ts";

try {
  const modelContent = await createModelConfig();
  await writeFile(
    "assets/model-config.json",
    JSON.stringify(modelContent),
    "utf8",
  );
  console.log("File written successfully!");
} catch (error) {
  console.error("Error writing file:", error);
}
