import { expect, test } from "@playwright/test";
const { username, password } = require("../fixtures/fixtures");

test("01 Should take a screenshot of registration page", async ({ page }) => {
  await page.goto("/registrace");
  await page.screenshot({ path: "PrvniScreenshot.png", fullPage: true });

  const regName = page.locator("input#name");
  await regName.screenshot({ path: "regName.png" });

  const regEmail = page.getByLabel("email");
  await regEmail.screenshot({ path: "regEmail.png" });

  const regPassword = page.locator("input#password");
  await regPassword.screenshot({ path: "regPassword.png" });

  const confirmPassword = page.getByLabel("Kontrola hesla");
  await confirmPassword.screenshot({ path: "confirmPassword.png" });

  const registerButton = page.getByText("Zaregistrovat");
  await registerButton.screenshot({ path: "registerButton.png" });
});

test("02 Should find locator for each button", async ({ page }) => {
  await page.goto("/registrace");

  const h1Locator = page.locator("h1");
  console.log("The H1 heading is " + "h1Locator");

  const regName = page.locator("input#name"); // Name and Surname by tag and ID
  await regName.screenshot({ path: "regName.png" });

  const regEmail = page.locator('input[type="email"]'); // Email by tag and atribute
  await regEmail.screenshot({ path: "regEmail.png" });

  const regPassword = page.locator("input#password"); // PSWD field by tag and ID
  await regPassword.screenshot({ path: "regPassword.png" });

  const confirmPassword = page.getByLabel("Kontrola hesla"); // Repeat PSWD by label
  await confirmPassword.screenshot({ path: "confirmPassword.png" });

  const registerButton = page.locator(".btn-primary"); // Button by css class
  await registerButton.screenshot({ path: "registerButton.png" });
});

test("03 Should fill in registration form", async ({ page }) => {
  await page.goto("/registrace");
  const regUserName = page.locator("input#name");
  const regEmail = page.locator("input#email");
  const regPassword = page.locator("input#password");
  const regPasswordConfirm = page.locator("input#password-confirm");

  await regUserName.fill("Sarka D");
  await regEmail.fill("korci@centrum.cz");
  await regPassword.fill("czechitas");
  await regPasswordConfirm.fill("czechitas");
  await page.locator(".btn-primary").click();
  await page.screenshot({ path: "registrationScreenshot.png", fullPage: true });
});

test("04-01 Registration of new user", async ({ page }) => {
  await page.goto("/registrace");
  const regUserName = page.locator("input#name");
  const regEmail = page.locator("input#email");
  const regPassword = page.locator("input#password");
  const regPasswordConfirm = page.locator("input#password-confirm");

  await regUserName.fill("Sarka D");
  await regEmail.fill("yecopeh939@evasud.com");
  await regPassword.fill("Czechitas123");
  await regPasswordConfirm.fill("Czechitas123");
  await page.locator(".btn-primary").click();

  const registeredUserName = page
    .locator("div")
    .locator(".navbar-right")
    .locator("strong");
  await expect(registeredUserName).toHaveText("Sarka D");
});

test("04-02 Registration with an existing email address", async ({ page }) => {
  await page.goto("/registrace");
  const regUserName = page.locator("input#name");
  const regEmail = page.locator("input#email");
  const regPassword = page.locator("input#password");
  const regPasswordConfirm = page.locator("input#password-confirm");

  await regUserName.fill("Sarka D");
  await regEmail.fill("korci@centrum.cz");
  await regPassword.fill("Czechitas123");
  await regPasswordConfirm.fill("Czechitas123");
  await page.locator(".btn-primary").click();

  const registeredUserName = page
    .locator("div")
    .locator(".navbar-right")
    .locator("strong");
  await expect(registeredUserName).not.toBeAttached;

  const registrationError = page.locator(".invalid-feedback").locator("strong");
  await expect(registrationError).toBeAttached();

  console.log(
    "Error message is " +
      (await page.locator(".invalid-feedback").textContent())
  );
});

test("04-03 Registration with an existin email address", async ({ page }) => {
  await page.goto("/registrace");
  const regUserName = page.locator("input#name");
  const regEmail = page.locator("input#email");
  const regPassword = page.locator("input#password");
  const regPasswordConfirm = page.locator("input#password-confirm");

  await regUserName.fill("Sarka D");
  await regEmail.fill("abc@centrum.cz");
  await regPassword.fill("Czechitas");
  await regPasswordConfirm.fill("Czechitas");
  await page.locator(".btn-primary").click();

  console.log("Error message appeared") +
    (await expect(page.locator("div").locator(".toast-error")).toBeAttached());

  console.log(
    "Error message is " +
      (await page.locator(".invalid-feedback").textContent())
  );
});




test.describe("Registration of new user", () => {
  test.beforeEach(
    "05 Verify register form fields are visible",
    async ({ page }) => {
      await page.goto("/registrace");
      const regUserName = page.locator("input#name");
      const regEmail = page.locator("input#email");
      const regPassword = page.locator("input#password");
      const regPasswordConfirm = page.locator("input#password-confirm");
      const registerButton = page.locator(".btn-primary");

      await page.getByText("Registrace").toBeAttached;
      console.log("The title is visible");
      await expect(registerButton).toHaveText("Zaregistrovat");
      console.log("The Register button is visible");

      await regUserName.toBeEditable;
      console.log("The Username field is editable");
      await regEmail.waitFor({ state: "visible" });
      await expect(regPassword).toBeAttached({ attached: true });
      await expect(regPasswordConfirm).toBeAttached;
      console.log(
        "Both Password and Confirm password fields are present in DOM."
      );
    }
  );





    test("05 New Registration", async ({ page }) => {

      
      await test.step("Getting unique email address", async () => {
        await page.goto("https://www.ipvoid.com/random-email/");
        await page
          .getByLabel("Consent", { exact: true })
          .waitFor({ state: "attached" });
        await page.getByLabel("Consent", { exact: true }).click();
        await page.locator("#iTotal").waitFor({ state: "visible" });
        await page.locator("#iTotal").press("Delete");
        await page.locator("#iTotal").press("Delete");
        await page.locator("#iTotal").fill("1");
        await page
          .getByRole("button", { name: "Generate Random Emails" })
          .click();

        await page.locator('textarea[name="text"]').click();
        await page.locator('textarea[name="text"]').press("Control+A");
        await page.locator('textarea[name="text"]').press("Control+C");
      });

      await test.step("Registering new user", async () => {
        await page.goto("/registrace");

        const regUserName = page.locator("input#name");
        const regEmail = page.locator("input#email");
        const regPassword = page.locator("input#password");
        const regPasswordConfirm = page.locator("input#password-confirm");
        const registerButton = page.locator(".btn-primary");

        await regUserName.fill("Sarka D");
        await regEmail.click();
        await regEmail.press("Control+V");
        await regPassword.fill("Czechitas123");
        await regPasswordConfirm.fill("Czechitas123");
        await page.locator(".btn-primary").click();
        await page.screenshot({
          path: "registrationScreenshot.png",
          fullPage: true,
        });
      });

      const registeredUserName = page
        .locator("div")
        .locator(".navbar-right")
        .locator("span");
      await expect(registeredUserName).toHaveText("Přihlášen");
      console.log("User is logged in");

      console.log(
        "Their user name is " +
          (await page
            .locator("div")
            .locator(".navbar-right")
            .locator("strong")
            .textContent())
      );


    })
  });




test.describe("Register new user - Negative scenarios", () => {
    test("Register with an existing email address", async ({ page }) => {
      await page.goto("/registrace");

      const regUserName = page.locator("input#name");
      const regEmail = page.locator("input#email");
      const regPassword = page.locator("input#password");
      const regPasswordConfirm = page.locator("input#password-confirm");
      const registerButton = page.locator(".btn-primary");

      await test.step("Fills in user's data and existing email", async () => {

      await regUserName.fill("Sarka D");
      await regEmail.click();
      await regEmail.fill(username);
      await regPassword.fill("Czechitas123");
      await regPasswordConfirm.fill("Czechitas123");
      await page.locator(".btn-primary").click();
      await page.screenshot({
        path: "registrationInvalidScreenshot.png",
        fullPage: true,
      });
    });

      await test.step("Writes error messages to console", async () => {
      for (const row of await page.locator('.invalid-feedback').all())
        console.log(await row.textContent());

    });

 });
    


    test("Register with weak password", async ({ page }) => {
      await page.goto("/registrace");

      const regUserName = page.locator("input#name");
      const regEmail = page.locator("input#email");
      const regPassword = page.locator("input#password");
      const regPasswordConfirm = page.locator("input#password-confirm");
      const registerButton = page.locator(".btn-primary");

      await test.step("Fills in user's data and existing email", async () => {

      await regUserName.fill("Sarka D");
      await regEmail.click();
      await regEmail.fill(username);
      await regPassword.fill("Czechitas");
      await regPasswordConfirm.fill("Czechitas");
      await page.locator(".btn-primary").click();
      await page.screenshot({
        path: "registrationInvalidPasswordScreenshot.png",
        fullPage: true,
      });
    });

      await test.step("Writes error messages to console", async () => {
      for (const row of await page.locator('.invalid-feedback').all())
        console.log(await row.textContent());

    });

 });
    

  });











  



