import { expect, test } from "@playwright/test";

test("home shows default assumptions", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Default assumptions")).toBeVisible();
  await expect(page.getByText(/Effective tax rate:\s*22%/)).toBeVisible();
  await expect(page.getByText(/Safety buffer:\s*0%/)).toBeVisible();
});
