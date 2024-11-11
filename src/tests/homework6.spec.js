import { test, expect } from "@playwright/test";
import {username, password, userFullName, applicationsPageSize, applicationsSearchText} from "../fixtures/fixtures.js";
import { RegExp } from "../fixtures/regular-expressions.js";

test.describe("Should testing Registration page", () => {

    function getUserFullNameField(page) {
        return page.getByLabel("Jméno a příjmení")
    }

    function getEmailField(page) {
        return page.getByLabel("Email");
    }

    function getPasswordField(page) {
        return page.getByLabel("Heslo");
    }

    function getControlPasswordField(page) {
        return page.getByLabel("Kontrola hesla");
    }

    function getRegistrationButton(page) {
        return page.getByRole("button", { name: "Zaregistrovat"});
    }

    test.beforeEach(async ({ page }) => {
        await page.goto("/registrace");

        const userFullNameField = getUserFullNameField(page);
        console.log("userFullName field is visible" + (await userFullNameField.isVisible()));
        console.log("userFullName field is enabled" + (await userFullNameField.isEnabled()));

        const emailField = getEmailField(page);
        console.log("Email field is visible" + (await emailField.isVisible()));
        console.log("Email field is enabled" + (await emailField.isEnabled()));

        const passwordField = getPasswordField(page);
        console.log("Password field is visible" + (await passwordField.isVisible()));
        console.log("Password field is enabled" + (await passwordField.isEnabled()));

        const controlPasswordField = getControlPasswordField(page);
        console.log("controlPassword field is visible" + (await controlPasswordField.isVisible()));
        console.log("controlPassword field is enabled" + (await controlPasswordField.isEnabled()));

        const registrationButton = getRegistrationButton(page);
        console.log("Registration button text: " + (await registrationButton.textContent()));
        });

    test("Registration with INVALID data", async ({ page }) => {

        const existingEmail = "Zuzana123@seznam.cz";
        const invalidEmail = "lisakadmin@lisakadmin";
        const invalidPassword = "123456";
        const invalidControlPassword = "czechitas123"
        const newUserFullName = "Zuza Goldová";
        const newUserName = "ZuzaG@czechitas.cz";
        const newPassword = "Czechitas1"

        const getUserFullNameField = () => page.getByLabel("Jméno a příjmení");
        const getEmailField = () => page.getByLabel("Email");
        const getPasswordField = () => page.getByLabel("Heslo");
        const getControlPasswordField = () => page.getByLabel("Kontrola hesla");
        const getRegistrationButton = () => page.getByRole("button", { name: "Zaregistrovat" });

        await test.step('Fill registration data with EXISTING email', async() => {

            const userFullNameField = await getUserFullNameField();
            const emailField = await getEmailField();
            const passwordField = await getPasswordField();
            const controlPasswordField = await getControlPasswordField();
            const registrationButton = await getRegistrationButton();

            await userFullNameField.fill(newUserFullName);
            await emailField.fill(existingEmail);
            await passwordField.fill(newPassword);
            await controlPasswordField.fill(newPassword);
            await registrationButton.click();

            const toastMessage = page.locator(".toast-message");
            const fieldError = page.locator(".invalid-feedback");

                await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
                await expect(fieldError).toHaveText("Účet s tímto emailem již existuje.");
            });

        await test.step("Fill registration data with INVALID email", async ({ page }) => {
    
            const userFullNameField = await getUserFullNameField();
            const emailField = await getEmailField();
            const passwordField = await getPasswordField();
            const controlPasswordField = await getControlPasswordField();
            const registrationButton = await getRegistrationButton();

            await userFullNameField.fill(newUserFullName);
            await emailField.fill(invalidEmail);
            await passwordField.fill(newPassword);
            await controlPasswordField.fill(newPassword);
            await registrationButton.click();

            const toastMessage = page.locator(".toast-message");
            const fieldError = page.locator(".invalid-feedback");

                await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
                await expect(fieldError).toHaveText("Zadaná adresa neexistuje, zkontrolujte překlepy");
            });

        await test.step("Fill registration data with INVALID password", async ({ page }) => {
    
            const userFullNameField = await getUserFullNameField();
            const emailField = await getEmailField();
            const passwordField = await getPasswordField();
            const controlPasswordField = await getControlPasswordField();
            const registrationButton = await getRegistrationButton();

            await userFullNameField.fill(newUserFullName);
            await emailField.fill(newUsername);
            await passwordField.fill(invalidPassword);
            await controlPasswordField.fill(invalidPassword);
            await registrationButton.click();

            const toastMessage = page.locator(".toast-message");
            const fieldError = page.locator(".invalid-feedback");

                await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
                await expect(fieldError).toHaveText("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");
            });

        await test.step("Fill registration data with INVALID control password", async ({ page }) => {
    
            const userFullNameField = await getUserFullNameField();
            const emailField = await getEmailField();
            const passwordField = await getPasswordField();
            const controlPasswordField = await getControlPasswordField();
            const registrationButton = await getRegistrationButtton();
            
            await userFullNameField.fill(newUserFullName);
            await emailField.fill(newUsername);
            await passwordField.fill(password);
            await controlPasswordField.fill(invalidPassword);
            await registrationButton.click();

            const toastMessage = page.locator(".toast-message");
            const fieldError = page.locator(".invalid-feedback");

                await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
                await expect(fieldError).toHaveText("Hesla se neshodují");
            });
        });

    test("Registration with VALID Email and Password", async ({ page }) => {

        const newUserFullName = "Zuzanka Goldová";
        const newUserName = "ZuzaGo@czechitas.cz";
        const newPassword = "Czechitas12"

        const userFullNameField = await page.getByLabel("Jméno a příjmení");
        const emailField = await page.getByLabel("Email");
        const passwordField = await page.getByLabel("Heslo");
        const controlPasswordField = await page.getByLabel("Kontrola hesla");
        const registrationButton = await page.getByRole("button", { name: "Zaregistrovat" });

        await userFullNameField.fill(newUserFullName);
        await emailField.fill(newUserName);
        await passwordField.fill(newPassword);
        await controlPasswordField.fill(newPassword);
        await registrationButton.click();

        await page.goto("/");

        const currentUrl = page.url();
        console.log("Current URL after registration: ", currentUrl);  // Přidáno pro vizuální kontrolu registrace
    
        // Moje ujištění o ne/úspěšné registraci
        if (currentUrl.includes("profil")) {
            console.log("Registrace byla úspěšná a uživatel je na stránce profilu.");
        } else {
            console.log("Registrace selhala nebo přesměrování neproběhlo.");
        }

        // Screenshot úspěšné registrace
        await page.screenshot({ path: "registration_successful_ZuzaGo.png" });
        });
});