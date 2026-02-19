import { expect, test } from "@playwright/test";

test("assumptions sliders update displayed values", async ({ page }) => {
  await page.goto("/planner");

  await expect(page.getByTestId("tax-rate-value")).toHaveText("22%");
  await expect(page.getByTestId("buffer-pct-value")).toHaveText("0%");

  await page.locator("#taxRate").evaluate((el) => {
    const input = el as HTMLInputElement;
    input.valueAsNumber = 0.3;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });

  await page.locator("#bufferPct").evaluate((el) => {
    const input = el as HTMLInputElement;
    input.valueAsNumber = 0.1;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });

  await expect(page.getByTestId("tax-rate-value")).toHaveText("30%");
  await expect(page.getByTestId("buffer-pct-value")).toHaveText("10%");
});
