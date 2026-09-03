import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import siteConfig from "./site-config.json" with { type: "json" };
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: "index.html",
      },
      manifest: {
        name: siteConfig.appName,
        short_name: siteConfig.shortName,
        theme_color: siteConfig.themeColor,
        background_color: siteConfig.backgroundColor,
        display: "standalone",
        start_url: "/",
      },
      pwaAssets: {
        disabled: false,
        config: true,
      },
    }),
    createHtmlPlugin({
      minify: true,
      pages: [
        {
          filename: "index.html",
          template: "index.html",
          injectOptions: {
            data: {
              title: siteConfig.appName,
              metaDescription: siteConfig.metaDescription,
              publicSiteAddress: siteConfig.publicSiteAddress,
            },
          },
        },
      ],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.tsx",
  },
});
