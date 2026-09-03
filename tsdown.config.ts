import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/lib/index.ts",
  },
  format: ["esm"],
  copy: [
    {
      from: "src/lib/styles/loading/loading.css",
      to: "dist/",
    },
    {
      from: "src/lib/styles/global/global.css",
      to: "dist/",
    },
  ],
  loader: {
    ".css": "text",
    css: "text",
  },
});
