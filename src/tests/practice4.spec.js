import { expect, test } from "@playwright/test";
import { username, password } from "../fixtures/fixtures";

test("should open login page", async ({ page }) => {
  await page.goto("/prihlaseni");

  //Ověř stav přihlašovacího formuláře
  //Políčko a tlačítka pro přihlášení jsou viditelná
  //Tlačítko pro přihlášení obsahuje správný text

  const emailField = page.locator("#email");
  await expect(emailField, "email field should be enabled").toBeEnabled();
  await expect(emailField, "email field should be visible").toBeVisible();

  const passwordField = page.locator("#password");
  await expect(passwordField, "password field should be enabled").toBeEnabled();
  await expect(passwordField, "password field should be visible").toBeVisible();

  const loginButton = page.locator(".btn btn-primary");
  await expect(loginButton, "login button should be enabled").toBeEnabled();
  await expect(loginButton, "login button should be visible").toBeVisible();
  await expect(loginButton, "login button should have text").toHaveText("Přihlásit");

  //Přihlaš se do aplikace a ověř
  //formulář přihlášení není vidět
  //že je v pravém horním rohu správné jméno uživatele
  await await emailField.fill(username);
  await passwordField.fill(password);
  await loginButton.click();
});
//Optional: Zkus si nějaké další assertace
//Zkus si negaci not
//Vyzkoušej porovnání screenshotů

//Uprav test pro tabulku přihlášek tak, aby …
//Po přihlášení tabulka obsahuje správný počet přihlášek

//Každá přihláška obsahuje:
//jméno účastníka
//kategorii kurzu
//datum konání
//cenu

//Vyplň něco do políčka Hledat a ověř, že se tabulka správně profiltrovala. Opět k tomu použijte assertace
