import { expect, test } from "@playwright/test";

import {
  ApplicationTexts,
  invalidPassword,
  password,
  userFullName,
} from "../fixtures/fixtures.js";

import { LoginPage } from "./pages/login.page.js";
import { RegistrationPage } from "./pages/registration.page.js";

test.describe("Registration Page is Correctly Displayed", async () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.registrationButton.click();
    await test
      .expect(page)
      .toHaveTitle(ApplicationTexts.registrationPage.title);
  });

  test("verify registration form is displayed correctly ", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);

    await expect(
      registrationPage.fullNameInput,
      "name input field should be visible"
    ).toBeVisible();
    await expect(
      registrationPage.fullNameInput,
      "name input field should be enabled"
    ).toBeEnabled();

    await expect(
      registrationPage.emailInput,
      "email input field should be visible"
    ).toBeVisible();
    await expect(
      registrationPage.emailInput,
      "email input field should be enabled"
    ).toBeEnabled();

    await expect(
      registrationPage.passwordInput,
      "password input field should be visible"
    ).toBeVisible();
    await expect(
      registrationPage.passwordInput,
      "password input field should be enabled"
    ).toBeEnabled();

    await expect(
      registrationPage.confirmPasswordInput,
      "confirm password input field should be visible"
    ).toBeVisible();
    await expect(
      registrationPage.confirmPasswordInput,
      "confirm password input field should be enabled"
    ).toBeEnabled();

    await expect(
      registrationPage.registrationButton,
      "registration button should be visible"
    ).toBeVisible();
    await expect(
      registrationPage.registrationButton,
      "login button text should have text"
    ).toHaveText(ApplicationTexts.registrationPage.registrationButtonLabel);
  });

  test("verify registration form using screenshot", async ({ page }) => {
    await page.screenshot({ path: "registrationForm.png" });
  });
});

test.describe("User Registration - Valid and Invalid Credentials", () => {
  let testEmail;

  test.beforeAll(async () => {
    testEmail = `testuserCzechitas+${Date.now()}@gmail.com`;
    console.log("Generated Email in beforeAll:", testEmail);
  });

  test.beforeEach(async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.open();
    await test
      .expect(page)
      .toHaveTitle(ApplicationTexts.registrationPage.title);
  });

  test("should register with valid credentials", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.register(userFullName, testEmail, password);

    await expect(registrationPage.usernameDropdown).toHaveText(userFullName);
  });

  test("should not register with existing email", async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.register(userFullName, testEmail, password);
    await expect(registrationPage.toast).toHaveText(
      "Některé pole obsahuje špatně zadanou hodnotu"
    );
    await expect(registrationPage.fieldError).toHaveText(
      "Účet s tímto emailem již existuje"
    );
  });

  test("should not register with invalid password - only digits", async ({
    page,
  }) => {
    const testEmail2 = `testuserCzechitas+${Date.now()}@gmail.com`;
    const registrationPage = new RegistrationPage(page);
    await registrationPage.register(userFullName, testEmail2, invalidPassword);
    await expect(registrationPage.toast).toHaveText(
      "Některé pole obsahuje špatně zadanou hodnotu"
    );
    await expect(registrationPage.fieldError).toHaveText(
      "Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici"
    );
  });
});
