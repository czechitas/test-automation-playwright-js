// import { test } from "@playwright/test";

// test("should open login page", async ({ page }) => {
//    await page.goto("/prihlaseni");
//    console.log(await page.title());
// });

import { test } from "@playwright/test";
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
  test.setTimeout(60 * 1000);
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
    
  }
});
