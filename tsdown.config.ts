import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm"],
  copy: [
    {
      from: "src/styles/loading/loading.css",
      to: "dist/",
    },
    {
      from: "src/styles/global/global.css",
      to: "dist/",
    },
  ],
  loader: {
    ".css": "text",
    css: "text",
  },
});
