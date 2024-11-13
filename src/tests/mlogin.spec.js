import { expect, test } from "@playwright/test";
import { username, password, userFullName } from "../fixtures/fixtures";

const pageTitle = "Přihlášení - Czechitas";

async function openLoginPage(page) {
  await page.goto("/prihlaseni");
};

function getEmailField(page) {
  return page.getByLabel('Email');
};

function getPasswordField(page) {
  return page.getByLabel('Heslo');
};

function getLoginButton(page) {
  return page.getByRole("button", { name: "Přihlásit"});
};

function gettoastMessage(page) {
  return page.locator(".toast-message");
};

function getFieldError(page) {
  return page.locator(".invalid-feedback");
};

function getNavbarRight(page) {
  return page.locator(".navbar-right")
};

function getUserNameDropdown(page) {
  return getNavbarRight(page).locator('[data-toggle="dropdown"]');
};

function getLogoutLink(page) {
  return page.locator("#logout-link");
};

async function login(page, username, password) {
  await page.goto("/prihlaseni");
  await page.getByLabel("Email").fill(username);
  await page.getByLabel("Heslo").fill(password);
  await page.getByRole("button", { name: "Přihlásit"}).click();
};

test.describe("Login Page", async () => {

    test.beforeEach(async ({page}) => {
      await openLoginPage(page);
      await test.expect(page).toHaveTitle(pageTitle);
    });

    test("should login with no credentials",{tag:'@quick'}, async ({ page }) => {
      const loginButton1 = getLoginButton(page);
      await loginButton1.click();
      //Zkontroluj, že se objevila chyba a uživatel se nepřihlásil
      await expect(loginButton1, "login button should be visible").toBeVisible();
    });

    test("should show login form", async ({ page }) => {
      //Ověř stav přihlašovacího formuláře
      //Políčko a tlačítka pro přihlášení jsou viditelná
      //Tlačítko pro přihlášení obsahuje správný text
      const emailField = getEmailField(page);
      await expect(emailField, "email field should be enabled").toBeEnabled();
      await expect(emailField, "email field should be visible").toBeVisible();

      const passwordField = getPasswordField(page);
      await expect(passwordField, "password field should be enabled").toBeEnabled();
      await expect(passwordField, "password field should be visible").toBeVisible();

      const loginButton = getLoginButton(page);
      await expect(loginButton, "login button should be enabled").toBeEnabled();
      await expect(loginButton, "login button should be visible").toBeVisible();
      await expect(loginButton, "login button should have text").toHaveText("Přihlásit");
    });

    test("should not login with invalid credentials",{annotation:{type:"quick", description:"invalid"}}, async ({ page }) => {
      const emailField =  await getEmailField(page);
      const passwordField = await getPasswordField(page);
      const loginButton = await getLoginButton(page);

      await emailField.fill(username);
      await passwordField.fill("invalid");
      await loginButton.click();

      //Zkontroluj, že se objevila chyba a uživatel se nepřihlásil
      const toastMessage = await gettoastMessage(page); 
      const fieldError = await getFieldError(page);
      await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
      await expect(fieldError).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");

      await expect(emailField, "email field should be visible").toBeVisible();
      await expect(passwordField, "password field should be visible").toBeVisible();
      await expect(loginButton, "login buton should be visible").toBeVisible();      
    });

    test("should login with valid credential", async ({ page }) => {
      //Přihlaš se do aplikace 
      await getEmailField(page).fill(username);
      await getPasswordField(page).fill(password);
      await page.screenshot({ path: 'loginPage.png' });
      await getLoginButton(page).click();
      await page.screenshot({ path: 'mainPage.png' });
      //Zkontroluj, že se uživatel přihlásil
      await expect(page).toHaveURL("https://team8-2022brno.herokuapp.com");
      //že je v pravém horním rohu správné jméno uživatele 
      const userName = await getUserNameDropdown(page);
      await expect(userName).toHaveText(userFullName);
    });

    test("should logout", async ({ page }) => {
        await getEmailField(page).fill(username);
        await getPasswordField(page).fill(password);
        await getLoginButton(page).click();
        
        await expect(await getUserNameDropdown(page)).toHaveText(userFullName);
        await getUserNameDropdown(page).click();
        await getLogoutLink(page).click();

        await expect(await getUserNameDropdown(page)).toBeVisible({ visible: false });
        await expect(await getNavbarRight(page)).toHaveText("Přihlásit");
        await page.screenshot({ path: 'logOutPage.png' });
    });

});