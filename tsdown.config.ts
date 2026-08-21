import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
  copy: [{ from: "src/styles/main.css", to: "dist/" }],
});
