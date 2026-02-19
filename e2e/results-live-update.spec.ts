import { expect, test } from "@playwright/test";

test("results update live as inputs and tax rate change", async ({ page }) => {
  await page.goto("/planner");

  await page.getByLabel("Rent").fill("1000");
  await page.getByLabel("Groceries").fill("500");

  await expect(page.getByTestId("gross-annual")).toHaveText(/\$\d/);

  const grossAnnualBefore = await page.getByTestId("gross-annual").innerText();

  await page.locator("#taxRate").evaluate((el) => {
    const input = el as HTMLInputElement;
    input.valueAsNumber = 0.4;
    input.dispatchEvent(new Event("input", { bubbles: true }));
  });

  const grossAnnualAfter = await page.getByTestId("gross-annual").innerText();
  expect(grossAnnualAfter).not.toBe(grossAnnualBefore);
});
