import { test } from "@playwright/test";

test("should open login page 2", async ({ page }) => {
    console.log("Můj první úkol");

    await page.goto("/registrace");
    console.log(await page.title());

    // Screenshot při rozlišení 800x600
    await page.setViewportSize({ width: 800, height: 600 });
    await page.screenshot({ path: "login_page_800_600.png" });

});