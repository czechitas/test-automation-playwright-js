import { expect, test } from "@playwright/test";
const {username, password} = require("../fixtures/fixtures");


test("should open login page", async ({ page }) => {
    await page.goto("/prihlaseni");


//S použitím najdi na stránce elementy pro vyplnění emailu a hesla
await page.locator("#email").screenshot({ path: "css_id_email.png" });
await page.locator("#password").screenshot({ path: "css_id_password.png" });

//Zjisti, jestli jsou tyto elementy editovatelné (enabled) a viditelné pomocí isVisible a isEnabled
const enabled = await page.locator("#email").isEnabled();
const visible = await page.locator("#email").isVisible();
const enabledPassword = await page.locator("#password").isEnabled();
const visiblePassword = await page.locator("#password").isVisible();

console.log("Email field is enabled" + enabled);
console.log("Email field is visible" + visible);
console.log("Password field is enabled" + enabledPassword);
console.log("Password field is visible" + visiblePassword);

//Najdi tlačítko pro přihlášení a jeho vypiš text pomocí textContent
await page.locator(".btn-primary").screenshot({ path: "css_class_button.png" });
await locator.textContent();
await page.locator(".btn-primary").textContent();

//Najdi odkaz “Zapomněli jste své heslo?” a vypiš hodnotu jeho atributu href
await page.getByText("Zapomněli jste své heslo?").screenshot({ path: "playwright_text.png" });
href="https://team8-2022brno.herokuapp.com/zapomenute-heslo"

//V testu se přihlaš do aplikace, použij fill a click
await elementHandle.click();
await elementHandle.fill(value);

//Najdi element který obsahuje celé jméno přihlášeného uživatele a vypiš ho do konzole (tady by se ti mohlo hodit řetězení elementů)
await page.locator("div").locator("form").locator('input[type$="word"]').screenshot({ path: "chain_password.png" });



//Klikni na odkaz Přihlášky
//Vypiš název stránky (h1)
//Pomocí řetězení lokátorů a textContent najdi  všechny řádky tabulky s příhláškami. Dej si ale pozor, abys nehledal/a hlavičku ani zápatí tabulky.
//Vypiš počet záznamů tabulky
    //pomocí spočtení řádků
    //zkus zjistit počet záznamů z zápatí tabulky "Zobrazeno 1 až 10 záznamů z 10"
//Vypiš text každého řádku tabulky. 


});