import { expect, test } from "@playwright/test";

test("load example persists across reload", async ({ page }) => {
  await page.goto("/planner");
  await page.getByTestId("load-example").click();

  await expect(page.getByLabel("Rent")).toHaveValue("1200");
  await page.reload();
  await expect(page.getByLabel("Rent")).toHaveValue("1200");
});

test("reset clears values and persists across reload", async ({ page }) => {
  await page.goto("/planner");
  await page.getByTestId("load-example").click();
  await expect(page.getByLabel("Rent")).toHaveValue("1200");

  await page.getByTestId("reset").click();
  await expect(page.getByTestId("total-monthly-costs")).toHaveText("$0.00");

  await page.reload();
  await expect(page.getByTestId("total-monthly-costs")).toHaveText("$0.00");
});
