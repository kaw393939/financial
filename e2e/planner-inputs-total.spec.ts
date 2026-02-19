import { expect, test } from "@playwright/test";

test("planner inputs update total", async ({ page }) => {
  await page.goto("/planner");

  await page.getByLabel("Rent").fill("1000");
  await page.getByLabel("Groceries").fill("300");

  await expect(page.getByTestId("total-monthly-costs")).toHaveText("$1,300.00");
  await expect(page.getByTestId("net-needed")).toHaveText("$1,300.00");
});

test("planner clamps negative values", async ({ page }) => {
  await page.goto("/planner");

  await page.getByLabel("Misc").fill("-5");
  await expect(page.getByTestId("total-monthly-costs")).toHaveText("$0.00");
});
