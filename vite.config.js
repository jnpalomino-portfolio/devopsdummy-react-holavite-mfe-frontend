import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTest.js",
    reporters: ["default", "junit"],
    outputFile: "test-results.xml",
    coverage: {
      provider: "v8",
      reporter: ["cobertura", "text", "html", "lcov"],
      reportsDirectory: "./coverage",
    },
  },
});