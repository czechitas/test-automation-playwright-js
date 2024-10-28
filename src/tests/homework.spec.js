import { test } from "@playwright/test";
const { username, password } = require("../fixtures/fixtures");

test("01 Should take a screenshot of registration page", async ({ page }) => {
    await page.goto("/registrace");
    await page.screenshot({path: 'PrvniScreenshot.png', fullPage: true});


const regName = page.locator("input#name");
await regName.screenshot ({path: 'regName.png'});

const regEmail = page.getByLabel("email");
await regEmail.screenshot ({path: 'regEmail.png'});

const regPassword =  page.locator("input#password");
await regPassword.screenshot ({path: 'regPassword.png'});

const confirmPassword = page.getByLabel('Kontrola hesla')
await confirmPassword.screenshot ({path: 'confirmPassword.png'});

const registerButton = page.getByText("Zaregistrovat");
await registerButton.screenshot ({path: "registerButton.png"});
  
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
    await regEmail.fill("korci@centrum.cz")
    await regPassword.fill("czechitas");
    await regPasswordConfirm.fill("czechitas");
    await page.locator(".btn-primary").click();
    await page.screenshot({path: 'registrationScreenshot.png', fullPage: true});

    });

