import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import { defineBddConfig } from "playwright-bdd";

dotenv.config({ quiet: true });

const requiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} must be set in .env or CI secrets.`);
  }

  return value;
};

const testDir = defineBddConfig({
  features: "tests/features/*.feature",
  steps: ["tests/steps/*.ts", "tests/fixtures/*.ts"],
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: requiredEnv("BASE_URL"),
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
