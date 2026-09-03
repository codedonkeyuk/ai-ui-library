import { writeFile } from "node:fs/promises";
import createModel from "./createModel.ts";

try {
  await writeFile("Modelfile", createModel(), "utf8");
  console.log("File written successfully!");
} catch (error) {
  console.error("Error writing file:", error);
}
