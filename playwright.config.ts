import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:3100",
  },
  webServer: {
    command: "npm run dev -- --port 3100",
    port: 3100,
    reuseExistingServer: false,
  },
});
