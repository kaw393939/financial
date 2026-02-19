import { expect, test } from "@playwright/test";

test("home -> planner", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Start" }).click();

  await expect(page).toHaveURL(/\/planner\/?$/);
  await expect(page.getByRole("heading", { name: "Planner" })).toBeVisible();
});
