import { test } from "@playwright/test";
import { password, userFullName, username } from "../fixtures/fixtures";

test("should open registration page", async ({ page }) => {
  await page.goto("/registrace");

  await page.screenshot({ path: "registration_page.png" });
/*
  await page.locator("input#name").screenshot({ path: "css_combi_name.png" });
  await page.locator("#email").screenshot({ path: "css_id_email.png" });
  await page.locator("input#password").screenshot({ path: "css_combi_password.png" });
  await page.locator("#password-confirm").screenshot({ path: "css_id_password.png" });
  await page.locator(".btn-primary").screenshot({ path: "css_class_button.png" });
*/

//Vyplní jméno a příjmení
const nameReg = page.getByRole('textbox', {name: 'Jméno a příjmení'})
await nameReg.fill(userFullName);
//Vyplní email
const emailReg = page.getByRole('textbox', {name: 'Email'})
await emailReg.fill('test@test.com');
//Vyplní a potvrdí heslo
const passwordReg = page.getByRole('textbox', {name: 'Heslo'})
await passwordReg.fill(password);
const passwordReg2 = page.getByRole('textbox', {name: 'Kontrola hesla'})
await passwordReg2.fill(password);
await page.screenshot({ path: "filledRegistration.png" });
//Klikne na tlačítko pro odeslání registračního formuláře
const buttonReg = page.getByRole('button', {name: 'Zaregistrovat'})
await buttonReg.click;

//Test, který provede registraci uživatele s již existujícím emailem - zkontroluj, že registrace neproběhla a ověř chyby
const errorMessage = await page.locator('text=Email already exists').isVisible();
expect(errorMessage).toBe(true);

//Test, který provede registraci uživatele s nevalidním heslem (obsahující pouze čísla) - zkontroluj, že registrace neproběhla a ověř chyby
await emailReg.fill("VALIDEMAIL");
await passwordReg.fill('123456');
await passwordReg2.fill('123456');
const errorMessage2 = await page.locator('text=Email already exists').isVisible();
expect(errorMessage).toBe(true);

//Test který provede validní registraci uživatele - zkontroluj, že registrace proběhla úspěšně
await emailReg.fill("VALIDEMAIL");
await passwordReg.fill(password);
await passwordReg2.fill(password);
await expect(page.getByRole('button', {name: 'Zaregistrovat'})).toHaveURL('https://team8-2022brno.herokuapp.com/zaci');
await page.screenshot({ path: "afterRegistration.png" });


});