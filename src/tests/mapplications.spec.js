import { expect, test } from "@playwright/test";
import { username, password, userFullName } from "../fixtures/fixtures";

const pageTitle = "Přihlášky Czechitas";
//FUNKCE
//otevření login stránky (openLoginPage)
//přihlášení (funkce se dvěma parametry: login(username, password))
async function openLoginPage(page) {
  await page.goto("/prihlaseni");
  await page.getByLabel("Email").fill(username);
  await page.getByLabel("Heslo").fill(password);
  await page.getByRole('button', { name: "Přihlásit"}).click();
};

//přechod na stránku s přihláškami (goToApplications)
async function goToApplications(page) {
  await getByRole('link', { name: "Přihlášky"}).click();
};

//počkání na načtení tabulky (waitForTableToLoad)
async function waitForTableToLoad(page) {
  await page.waitForLoadState();
  await page.locator("#DataTables_Table_0_processing").waitFor({state: "hidden"});
};

//získání řádků tabulky (getTableRows)
async function getApplicationsTableRows(page) {
  return await page
      .locator(".dataTable")
      .locator("tbody")
      .locator("tr")
      .all();
};

//hledání v tabulce (searchInTable)
async function searchInApplicationsTable(page, text) {
  await page.locator("input[type='search']").fill(text);
  await page.locator("#DataTables_Table_0_processing"); // waits for loader to appear
};

//Zrefaktoruj testy aby používaly tyto funkce
test.describe("Applications Page", async () => {

    test.beforeEach(async ({page}) => {
        await openLoginPage(page);
        await test.expect(page).toHaveTitle(pageTitle);
        await goToApplications(page);
        await waitForTableToLoad(page);
    });

    test("should show the table of all applications",{tag: '@noidea'}, async ({ page }) => {
  
        //Jdi na stránku Přihlášky
        const allRows = await getApplicationsTableRows(page);
        await expect(allRows.length, "table should have >= " + applicationsPageSize + " rows")
            .toBeGreaterThanOrEqual(applicationsPageSize);
        await page.screenshot({ path: 'prihlaskyPage1.png' });

        for (const row of allRows) {
          const cells = row.locator("td");
          await expect(await cells.nth(0).textContent()).toMatch(RegExp.NAME);
          await expect(await cells.nth(1).textContent()).toMatch(RegExp.DATE);
          await expect(await cells.nth(2).textContent()).toMatch(RegExp.PAYMENT_TYPE);
          await expect(await cells.nth(3).textContent()).toMatch(RegExp.TO_PAY);
        }
    });
      
    test("should filter the table", async ({ page }) => {
        //get all rows
        const allRows = await getApplicationsTableRows(page);
        await expect(allRows.length, "table should have >= " + applicationsPageSize + " rows")
            .toBeGreaterThanOrEqual(applicationsPageSize);

        // search in table
        await searchInApplicationsTable(page, applicationsSearchText);
        await waitForTableToLoad(page);
        await page.screenshot({ path: 'prihlaskysearch.png' });
        // get filtered rows
        //Zkontroluj, že se stránka profiltrovala
        const filteredRows = await getApplicationsTableRows(page);
        await expect(filteredRows.length, "table should have < " + allRows.length + " rows")
            .toBeLessThan(allRows.length)

        // iterate over filtered rows
        for (const row of filteredRows) {
          const cells = row.locator("td");
          await expect(await cells.nth(0).textContent()).toContain(applicationsSearchText);
        }

    });
   
});


 //Uprav test pro tabulku přihlášek tak, aby po přihlášení tabulka obsahovala správný počet přihlášek ???
        //Každá přihláška obsahuje:
        //jméno účastníka
        //kategorii kurzu
        //datum konání
        //cenu

        //Vyzkoušej porovnání screenshotů
        //expect(screenshot1).toMatchSnapshot('prihlaskyPage1.png');
        //expect(screenshot2).toMatchSnapshot('prihlaskyPage2.png');
