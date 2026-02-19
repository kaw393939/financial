import { expect, test } from "@playwright/test";

test("keyboard can activate Start on Home", async ({ page }) => {
  await page.goto("/");

  const start = page.getByRole("link", { name: "Start" });
  await start.focus();
  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/\/planner\/?$/);
  await expect(page.getByRole("heading", { name: "Planner" })).toBeVisible();
});

test("mobile viewport shows core content without horizontal scroll", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/planner");

  await expect(page.getByTestId("total-monthly-costs")).toBeVisible();
  await expect(page.getByTestId("gross-annual")).toBeVisible();

  const noHorizontalScroll = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth <= root.clientWidth;
  });

  expect(noHorizontalScroll).toBe(true);
});
