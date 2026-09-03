import { writeFile } from "node:fs/promises";
import createModel from "./createModel.ts";

try {
  const modelContent = await createModel();
  await writeFile("Modelfile", modelContent, "utf8");
  console.log("File written successfully!");
} catch (error) {
  console.error("Error writing file:", error);
}
