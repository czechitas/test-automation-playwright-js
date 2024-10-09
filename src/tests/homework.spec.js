import { test } from "@playwright/test";

test("should open registration page and take screenshot", async ({ page }) => {
  await page.goto("/registrace");
  await page.screenshot({ path: "registrace.png" });
});
