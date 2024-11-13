import { test } from "@playwright/test";
import { type } from "os";

test("should open login page", async ({ page }) => {
  await page.goto("/prihlaseni");

  //LOCATORS
  //tag
  await page.locator("form").screenshot({ path: "css_form.png" });
  await page.locator("input").nth(1).screenshot({ path: "css_input_2.png" });
  //ID and class
  await page.locator("#email").screenshot({ path: "css_id_email.png" });
  await page.locator("#password").screenshot({ path: "css_id_password.png" });
  await page.locator(".btn-primary").screenshot({ path: "css_class_button.png" });
  //type
  await page.locator('[type="password"]').screenshot({ path: "css_type_password.png" });
  await page.locator('[type*="ass"]').screenshot({ path: "css_type2_password.png" });
  await page.locator('[type$="word"]').screenshot({ path: "css_type3_password.png" });
  await page.locator('[type^="pass"]').screenshot({ path: "css_type4_password.png" });
  //combination tag + id,class,type
  await page.locator("input#email").screenshot({ path: "css_combi_email.png" });
  await page.locator('input[type="password"]').screenshot({ path: "css_combi_password.png" });
  await page.locator("button.btn-primary").screenshot({ path: "css_combi_button.png" });
  //chain
  await page.locator("div").locator("form").locator('input[type$="word"]').screenshot({ path: "chain_password.png" });

  //PLAYWRIGHT LOCATORS
  //await page.getByRole('heading', {name:"email"}).screenshot({ path: "playwright_role.png" });
  await page.getByRole("heading", { level: 1 }).screenshot({ path: "playwright_role.png" });

  await page.getByLabel("Email").screenshot({ path: "playwright_label.png" });
  await page.getByText("Zapomněli jste své heslo?").screenshot({ path: "playwright_text.png" });
});
