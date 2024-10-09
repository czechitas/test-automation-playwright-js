import { test } from "@playwright/test";

test("should open registration page", async ({ page }) => {
  await page.goto("/registrace");

  await page.screenshot({ path: "registration_page.png" });
});