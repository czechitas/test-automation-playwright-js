import { expect, test } from "@playwright/test";
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

    test("04-01 Registration of new user", async ({ page }) => {
        await page.goto("/registrace");
        const regUserName = page.locator("input#name");
        const regEmail = page.locator("input#email");
        const regPassword = page.locator("input#password");
        const regPasswordConfirm = page.locator("input#password-confirm");
            
        await regUserName.fill("Sarka D");
        await regEmail.fill("yecopeh939@evasud.com")
        await regPassword.fill("Czechitas123");
        await regPasswordConfirm.fill("Czechitas123");
        await page.locator(".btn-primary").click();
      
        const registeredUserName = page
        .locator('div')
        .locator('.navbar-right')
        .locator('strong');
        await expect(registeredUserName).toHaveText('Sarka D');
         
        });
    

    test("04-02 Registration with an existing email address", async ({ page }) => {
        await page.goto("/registrace");
        const regUserName = page.locator("input#name");
        const regEmail = page.locator("input#email");
        const regPassword = page.locator("input#password");
        const regPasswordConfirm = page.locator("input#password-confirm");
            
        await regUserName.fill("Sarka D");
        await regEmail.fill("korci@centrum.cz")
        await regPassword.fill("Czechitas123");
        await regPasswordConfirm.fill("Czechitas123");
        await page.locator(".btn-primary").click();

        const registeredUserName = page
        .locator('div')
        .locator('.navbar-right')
        .locator('strong');
        await expect(registeredUserName).not.toBeAttached
        

        const registrationError = page
        .locator('.invalid-feedback')
        .locator('strong');
        await expect(registrationError).toBeAttached();
        
        console.log("Error message is " + await page.locator('.invalid-feedback').textContent());
      
        });

    
        test("04-03 Registration with an existin email address", async ({ page }) => {
            await page.goto("/registrace");
            const regUserName = page.locator("input#name");
            const regEmail = page.locator("input#email");
            const regPassword = page.locator("input#password");
            const regPasswordConfirm = page.locator("input#password-confirm");
                
            await regUserName.fill("Sarka D");
            await regEmail.fill("abc@centrum.cz")
            await regPassword.fill("Czechitas");
            await regPasswordConfirm.fill("Czechitas");
            await page.locator(".btn-primary").click();
            
         
            console.log('Error message appeared') + await expect(page
                .locator('div')
                .locator('.toast-error')
            ).toBeAttached();

            
            console.log("Error message is " + await page.locator('.invalid-feedback').textContent());

                  
            });
