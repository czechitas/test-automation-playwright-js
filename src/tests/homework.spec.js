import { test } from "@playwright/test";

test("should open registration page", async ({ page }) => {
  await page.goto("/registrace");

  await page.screenshot({ path: "registration_page.png" });

  await page.locator("input#name").screenshot({ path: "css_combi_name.png" });
  await page.locator("#email").screenshot({ path: "css_id_email.png" });
  await page.locator("input#password").screenshot({ path: "css_combi_password.png" });
  await page.locator("#password-confirm").screenshot({ path: "css_id_password.png" });
  await page.locator(".btn-primary").screenshot({ path: "css_class_button.png" });


});