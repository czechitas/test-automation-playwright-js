import { expect, test } from "@playwright/test";
import { username, password, userFullName } from "../fixtures/fixtures";

test.describe("Login Page", () => {

  test.beforeEach(async ({page}) => {
      await page.goto("/prihlaseni");
  });

    test("should login with no credentials",{tag:'@quick'}, async ({ page }) => {
      const loginButton1 = page.getByRole("button", { name: "Přihlásit"});
      await loginButton1.click();

      //Zkontroluj, že se objevila chyba a uživatel se nepřihlásil
      await expect(loginButton1, "login buton should be visible").toBeVisible();
    });

    test("should login with invalid credentials",{annotation:{type:"quick", description:"invalid"}}, async ({ page }) => {
      const emailField = page.getByLabel("Email");
      const passwordField = page.getByLabel("Heslo");
      const loginButton = page.getByRole("button", { name: "Přihlásit"});

      await emailField.fill(username);
      await passwordField.fill("invalid");
      await loginButton.click();
      //Zkontroluj, že se objevila chyba a uživatel se nepřihlásil
      const toastMessage = page.locator(".toast-message"); //toastr.error
      const fieldError = page.locator(".invalid-feedback");
      await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
      await expect(fieldError).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");
      await expect(emailField, "email field should be visible").toBeVisible();
      await expect(passwordField, "password field should be visible").toBeVisible();
      await expect(loginButton, "login buton should be visible").toBeVisible();
    });


    test("should login with valid credential", async ({ page }) => {

      //Ověř stav přihlašovacího formuláře
      //Políčko a tlačítka pro přihlášení jsou viditelná
      //Tlačítko pro přihlášení obsahuje správný text

      const emailField = page.locator("#email");
      await expect(emailField, "email field should be enabled").toBeEnabled();
      await expect(emailField, "email field should be visible").toBeVisible();

      const passwordField = page.locator("#password");
      await expect(passwordField, "password field should be enabled").toBeEnabled();
      await expect(passwordField, "password field should be visible").toBeVisible();

      const loginButton = page.getByRole("button", { name: "Přihlásit" });
      await expect(loginButton, "login button should be enabled").toBeEnabled();
      await expect(loginButton, "login button should be visible").toBeVisible();
      await expect(loginButton, "login button should have text").toHaveText("Přihlásit");

      //Přihlaš se do aplikace 
      await emailField.fill(username);
      await passwordField.fill(password);
      await page.screenshot({ path: 'loginPage.png' });
      await loginButton.click();
      await page.screenshot({ path: 'mainPage.png' });
      //Zkontroluj, že se uživatel přihlásil
      await expect(loginButton, "login button should have text").not.toHaveText("Přihlásit");

      //over ze formulář přihlášení není vidět ???
      
      //že je v pravém horním rohu správné jméno uživatele ???
      const currentUser = page
            .locator(".nav.navbar-nav.navbar-right.ml-auto") // page.locator(".nav.navbar-nav.navbar-right.ml-auto");
            .locator("strong");
        await expect(currentUser, "current user should be displayed").toHaveText(userFullName);
    });
      
});

test.describe("Table Page", () => {

  test.beforeEach(async ({page}) => {
      await page.goto("/prihlaseni");
  });
    test("should show the table",{tag: '@noidea'}, async ({ page }) => {

      //Jdi na stránku Přihlášky
      await page.getByRole('link', {name: 'Přihlášky'}).click();
      await page.waitForLoadState();
      await page.screenshot({ path: 'prihlaskyPage1.png' });

      await test.step('Explain the table', async() => {

      });

      const pageTitle = await page.getByRole("heading", {level: 1});
      await expect(pageTitle, "page title should be displayed").toHaveText("Přihlášky");
    
      //Zkus si negaci not
      await expect(pageTitle).not.toHaveText('Vyberte období akce');
      await page.screenshot({ path: 'prihlaskyPage2.png' });

      //Vyzkoušej porovnání screenshotů
      expect(screenshot1).toMatchSnapshot('prihlaskyPage1.png');
      expect(screenshot2).toMatchSnapshot('prihlaskyPage2.png');

      //The page shows loading indicator when the data is being loaded, we need to wait
      const loadingIndicator = page.locator("#DataTables_Table_0_processing");
      await loadingIndicator.waitFor({state: "visible"});
      await loadingIndicator.waitFor({state: "hidden"});

      //Uprav test pro tabulku přihlášek tak, aby po přihlášení tabulka obsahovala správný počet přihlášek ???

      //Každá přihláška obsahuje:
      //jméno účastníka
      //kategorii kurzu
      //datum konání
      //cenu

      const rows = await page
            .locator(".dataTable")
            .locator("tbody")
            .locator("tr")
            .all();

      await expect(rows.length, "table should have >= " + applicationsPageSize + " rows")
            .toBeGreaterThanOrEqual(applicationsPageSize);

      for (const row of rows) {
            const cells = row.locator("td");
            await expect(await cells.nth(0).textContent()).toMatch(RegExp.NAME);
            await expect(await cells.nth(1).textContent()).toMatch(RegExp.DATE);
            await expect(await cells.nth(2).textContent()).toMatch(RegExp.PAYMENT_TYPE);
            await expect(await cells.nth(3).textContent()).toMatch(RegExp.TO_PAY);
        }
    });

    test("should filter the table", async ({ page }) => {

      //Vyplň něco do políčka Hledat a ověř, že se tabulka správně profiltrovala. Opět k tomu použijte assertace
      await page.locator('input[type="search"]').fill(applicationsSearchText);
      await page.waitForLoadState()
      await loadingIndicator.waitFor({state: "visible"});
      await loadingIndicator.waitFor({state: "hidden"});
      //Zkontroluj, že se stránka profiltrovala

      const filteredRows = await page
          .locator(".dataTable")
          .locator("tbody")
          .locator("tr")
          .all();

      await expect(filteredRows.length, "table should have < " + applicationsPageSize + " rows")
          .toBeLessThan(applicationsPageSize);

      for (const row of filteredRows) {
          const cells = row.locator("td");
          await expect(await cells.nth(0).textContent()).toMatch(RegExp.NAME);
          await expect(await cells.nth(1).textContent()).toMatch(RegExp.DATE);
          await expect(await cells.nth(2).textContent()).toMatch(RegExp.PAYMENT_TYPE);
          await expect(await cells.nth(3).textContent()).toMatch(RegExp.TO_PAY);
      }

    });

    test("should logout", async ({ page }) => {

      const emailField = page.getByLabel("Email");
      const passwordField = page.getByLabel("Heslo");
      const loginButton = page.getByRole("button", { name: "Přihlásit"});
      const navbarRight = page.locator(".navbar-right")
      const userNameDropdown = navbarRight.locator("[data-toggle='dropdown']");
      const logoutLink = page.locator("#logout-link");

      await emailField.fill(username);
      await passwordField.fill(password);
      await loginButton.click();

      await expect(userNameDropdown).toHaveText(userFullName);

      await userNameDropdown.click();
      await logoutLink.click();

      await expect(userNameDropdown).toBeVisible({ visible: false });
      await expect(navbarRight).toHaveText("Přihlásit");
    });
});