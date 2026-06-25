import { expect, test } from "@playwright/test";

test("home renders the hero and footer without page errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
  expect(errors).toEqual([]);
});

test("the living gallery renders", async ({ page }) => {
  await page.goto("/storybook");
  await expect(page.getByRole("heading", { name: "The living gallery" })).toBeVisible();
});
