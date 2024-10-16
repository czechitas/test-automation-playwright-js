import { test } from "@playwright/test";

test("homework 1 - should open registration page and take screenshot", async ({
  page,
}) => {
  await page.goto("/registrace");
  await page.screenshot({ path: "registrace.png" });
});

test("homework 2 - should find best locators", async ({ page }) => {
  await page.goto("/registrace");

  //CSS locators
  //Políčko pro jméno a příjmení
  await page.locator("#name").screenshot({ path: "css_id_name.png" });

  //Políčko pro email
  await page.locator("#email").screenshot({ path: "css_id_email.png" });

  //Políčko pro zadání hesla
  await page.locator("#password").screenshot({ path: "css_id_password.png" });

  //Políčko pro kontrolu zadaného hesla
  await page
    .locator("#password-confirm")
    .screenshot({ path: "css_id_password_confirm.png" });

  //Tlačítko na registraci
  await page
    .locator(".btn-primary")
    .screenshot({ path: "css_class_zaregistrovat.png" });

  //Playwright locators

  await page
    .getByLabel("Jméno a příjmení")
    .screenshot({ path: "label_name.png" });
  await page.getByLabel("Email").screenshot({ path: "label_email.png" });
  await page.getByLabel("Heslo").screenshot({ path: "label_password.png" });
  await page
    .getByLabel("Kontrola hesla")
    .screenshot({ path: "label_password_confirm.png" });
  await page
    .getByRole("button", { name: "Zaregistrovat" })
    .screenshot({ path: "role_button.png" });
});
