import { test } from "@playwright/test";

test("should take a screenshot of registration page", async ({ page }) => {
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

/* 

function myAsyncFunction() {
    const result =  new Promise(resolve => {
        setTimeout(() => {
          resolve ("Done");
        }, 3000);
    });
    console.log(result);
 }
 
 console.log("Before");
   myAsyncFunction();
  console.log("After");
  
 */

 