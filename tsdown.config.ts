import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
  copy: [
    {
      from: "src/styles/main/main.css",
      to: "dist/",
    },
    {
      from: "src/styles/buttons/buttons.css",
      to: "dist/",
    },
  ],
});
