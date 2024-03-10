// vite.config.ts
/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    includeSource: ["test/**/*.test.ts"],
  },
});
