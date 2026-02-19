import { expect, test } from "@playwright/test";

test("non-numeric input does not break totals/results", async ({ page }) => {
  await page.goto("/planner");

  await page.getByLabel("Rent").evaluate((el) => {
    const input = el as HTMLInputElement;
    input.value = "abc";
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });

  await expect(page.getByTestId("total-monthly-costs")).toHaveText("$0.00");
  await expect(page.getByTestId("gross-annual")).toHaveText("$0.00");
});

test("max tax and buffer still yields finite results", async ({ page }) => {
  await page.goto("/planner");

  await page.getByLabel("Rent").fill("1000");

  await page.locator("#taxRate").evaluate((el) => {
    const input = el as HTMLInputElement;
    input.valueAsNumber = 0.4;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });

  await page.locator("#bufferPct").evaluate((el) => {
    const input = el as HTMLInputElement;
    input.valueAsNumber = 0.2;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });

  await expect(page.getByTestId("gross-annual")).toHaveText(/\$[0-9,]+\.[0-9]{2}/);
});
