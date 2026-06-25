import { expect, test } from "@playwright/test";

test("contact form is present and fillable", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Test User");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Message").fill("Hello — this is a test message.");
  await expect(page.getByRole("button", { name: /send message/i })).toBeEnabled();
});
