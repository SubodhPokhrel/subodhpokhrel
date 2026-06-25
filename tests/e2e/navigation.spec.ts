import { expect, test } from "@playwright/test";

const routes = ["/", "/about", "/work", "/contact", "/work/spark-os"];

for (const route of routes) {
  test(`loads ${route} without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    const response = await page.goto(route);
    expect(response?.status() ?? 0).toBeLessThan(400);
    await expect(page.locator("main")).toBeVisible();
    expect(errors).toEqual([]);
  });
}
