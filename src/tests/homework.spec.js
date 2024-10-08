import { test } from "@playwright/test";

test("should take a screenshot of registration page", async ({ page }) => {
    await page.goto("/registrace");
    await page.screenshot({path: 'PrvniScreenshot.png', fullPage: true});
});
