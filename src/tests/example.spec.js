// import { test } from "@playwright/test";

// test("should open login page", async ({ page }) => {
//    await page.goto("/prihlaseni");
//    console.log(await page.title());
// });

import { test, expect } from "@playwright/test";
const { username, password } = require("../fixtures/fixtures");

test("01 - Should take a screenshot of registration page", async ({ page }) => {
  await page.goto("/registrace");
  await page.screenshot({ path: "PrvniScreenshot.png", fullPage: true });
});

test("02", async ({ page }) => {
  await page.goto("/registrace");
  await page.screenshot({ path: "PrvniScreenshot.png", fullPage: true });

  const pageH1 = page.getByRole("heading", { level: 1 });
  await pageH1.screenshot({ path: "h1Title.png" });
  console.log("The H1 heading is" + (await pageH1.textContent()));

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
  await registerButton.screenshot({ path: "registerCssButton.png" });

  // const registerButton = page.getByText("Zaregistrovat");
});

test("03", async ({ page }) => {
  test.setTimeout(5 * 1000);
  await page.goto("/prihlaseni");
  const loginEmail = page.locator("input#email");
  const loginPassword = page.locator("input#password");

  console.log("Email field is editable " + (await loginEmail.isEnabled()));
  console.log("Password field is visible " + (await loginPassword.isVisible()));

  const loginButton = page.locator(".btn-primary");
  console.log("Text at Login button is:" + (await loginButton.textContent()));
  const forgottenPassword = page.getByRole("link", {
    name: "Zapomněli jste své heslo?",
  });

  console.log(await forgottenPassword.getAttribute("href"));
  await loginEmail.fill(username);
  await loginPassword.fill(password);
  await page.locator(".btn-primary").click();

  const userName = page
    .locator("div")
    .locator("header")
    .locator(".dropdown-toggle");

  console.log("User name is" + (await userName.textContent()));

  // 3 lekce 2 cvičení
  await page
    .getByRole("link", {
      name: "Přihlášky",
    })
    .click();
  await page.waitForLoadState();

  const h1Locator = page.locator("h1");
  console.log("The H1 heading is " + (await h1Locator.textContent()));

  const loadingTab = page.getByText("Provádím...");

  console.log(
    "Loading is finished" +
      (await loadingTab.waitFor({ state: "hidden", timeout: 5000 }))
  );

  const tableRecords = page.locator("#DataTables_Table_0_info");
  console.log(
    "The text below the table is: " + (await tableRecords.textContent())
  );

  const rows = await page
    .locator(".dataTable")
    .locator("tbody")
    .locator("tr")
    .all();

  console.log("There are " + rows.length + " records.");
  for (const row of rows) {
    const rowText = await row.textContent();
    console.log(rowText);

   await page.getByLabel('Hledat:').fill('Elizabeth');
   await page.waitForLoadState();

   const searchResultsRows = await page
   .locator(".DataTables_Table_0_info")
   .locator("tbody")
   .locator("tr")
   .all();

   const cells = await row.locator("td").all();
   for (const cell of cells) {
   console.log(await cell.textContent());
   }
    
  }

});



  test("05 - 01", async ({ page }) => {
    await page.goto("/prihlaseni");
    await page.locator(".btn-primary").click();
    // plus expect page to have url
    await expect(page.locator('.toast toast-error')).toBeVisible();

 
  await loginEmail.fill(username);
  await loginPassword.fill("abc");
  await page.locator(".btn-primary").click();


  const registrationErrorMsg = page
  .locator('.invalid-feedback')
  .locator('strong');
  await expect(registrationError).toBeAttached();

  });


  
  test("05 - 02", async ({ page }) => {
  const loginEmail = page.locator("input#email");

  await loginEmail.fill(username);
  await loginPassword.fill(password);
  await page.locator(".btn-primary").click();

  const registeredUserName = page
        .locator('div')
        .locator('.navbar-right')
        .locator('strong');
        await expect(registeredUserName).toHaveText('Lišák Admin');


        await page
        .getByRole("link", {
          name: "Přihlášky",
        })
        .click();
      await page.waitForLoadState();

         console.log(
        "Loading is finished" +
          (await loadingTab.waitFor({ state: "hidden", timeout: 5000 }))
      );

   
      await page
      .locator(".dataTable")
      .locator("tbody")
      .locator("tr")
      .all();

  
    console.log("There are " + rows.length + " records.");
    for (const row of rows) {
      const rowText = await row.textContent();
      console.log(rowText);
  }

  const tableCells = await page.locator('td');
  console.log(await tableCells.nth(0).textContent);

  await page.getByLabel('Hledat:').fill('Elizabeth');
  await page.waitForLoadState();

});







  test("05 - 04 Logout", async ({ page }) => {

  const userNameClick = await page.getByText("Lišák Admin").click();

});




















test("should test login and list applications", async ({ page }) => {
  await page.goto("/prihlaseni");

  const emailField = page.getByLabel("Email");
  const passwordField = page.getByLabel("Heslo");
  const loginButton = page.getByRole("button", { name: "Přihlásit"});

  await emailField.fill(username);
  await passwordField.fill("invalid");
  await loginButton.click();

  const toastMessage = page.locator(".toast-message");
  const fieldError = page.locator(".invalid-feedback");
  await expect(toastMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
  await expect(fieldError).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");
  await expect(emailField, "email field should be visible").toBeVisible();
  await expect(passwordField, "password field should be visible").toBeVisible();
  await expect(loginButton, "login buton should be visible").toBeVisible();

  await emailField.fill(username);
  await passwordField.fill(password);
  await loginButton.click();

  const currentUser = page
      .locator(".navbar-right")
      .locator("strong");
  await expect(currentUser, "current user should be displayed").toHaveText(userFullName);

  await page.getByRole("link", {name: "Přihlášky"}).click();
  await page.waitForLoadState();

  const loadingIndicator = page.locator("#DataTables_Table_0_processing");
  await loadingIndicator.waitFor({state: "visible"});
  await loadingIndicator.waitFor({state: "hidden"});

  const pageTitle = await page.getByRole("heading", {level: 1});
  await expect(pageTitle, "page title should be displayed").toHaveText("Přihlášky");

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


  await page.locator("input[type='search']").fill(applicationsSearchText);
  await page.waitForLoadState()
  await loadingIndicator.waitFor({state: "visible"});
  await loadingIndicator.waitFor({state: "hidden"});

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
