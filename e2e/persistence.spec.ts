import { expect, test } from "@playwright/test";

test("planner autosaves and restores from localStorage", async ({ page }) => {
  await page.goto("/planner");

  await page.getByLabel("Rent").fill("1000");
  await expect(page.getByTestId("total-monthly-costs")).toHaveText("$1,000.00");

  await page.reload();
  await expect(page.getByLabel("Rent")).toHaveValue("1000");
  await expect(page.getByTestId("total-monthly-costs")).toHaveText("$1,000.00");
});

test("corrupted localStorage does not break the app", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("btiplanner:v1", "not-json");
  });

  await page.goto("/planner");
  await expect(page.getByTestId("total-monthly-costs")).toHaveText("$0.00");
  await expect(page.getByTestId("gross-annual")).toHaveText("$0.00");
});
