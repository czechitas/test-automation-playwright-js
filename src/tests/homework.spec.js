import { expect, test } from "@playwright/test";
import { emailPole, hesloPole, jdiNaRegistraci, jmenoAPrijmeni, kontrolaHeslaPole, prihlasen, tlacitkoZaregistrovat } from "../helpers/functions";

test.describe("Registrační stránka a validní registrace", async () => {

    test.beforeEach(async ({page}) => {
        await jdiNaRegistraci(page);
    });

    test("Zobrazení formuláře registrace", async ({ page }) => {
        const poleJmenoPrijmeni= await jmenoAPrijmeni(page);
        const poleEmail = await emailPole(page);
        const poleHeslo = await hesloPole(page);
        const poleKontrolaHesla = await kontrolaHeslaPole(page);
        const zaregistrovatTlacitko = await tlacitkoZaregistrovat(page);

        await expect(poleJmenoPrijmeni).toBeVisible();
        await expect(poleEmail).toBeVisible();
        await expect(poleHeslo).toBeVisible();
        await expect(poleKontrolaHesla).toBeVisible();
    
        await expect(zaregistrovatTlacitko).toBeVisible();
        await expect(zaregistrovatTlacitko).toHaveText("Zaregistrovat");
    });

    test("Validní registrace uživatele", async ({ page }) => {
        const poleJmenoPrijmeni= await jmenoAPrijmeni(page);
        const poleEmail = await emailPole(page);
        const poleHeslo = await hesloPole(page);
        const poleKontrolaHesla = await kontrolaHeslaPole(page);
        const zaregistrovatTlacitko = await tlacitkoZaregistrovat(page);
        const prihlaseni = await prihlasen(page);

        await poleJmenoPrijmeni.fill("Iv Jindrová");
        await poleEmail.fill("fjindrova@gmail.com");
        await poleHeslo.fill("Zima2024!");
        await poleKontrolaHesla.fill("Zima2024!");
        await zaregistrovatTlacitko.click();
    
        await expect(prihlaseni).toHaveText("Iv Jindrová");
    });
})

test.describe("Nevalidní registrace", () => {

    test.beforeEach(async ({page}) => {
        await jdiNaRegistraci(page);
    });

    test("Nevalidní registrace uživatele - stejný email", async ({ page }) => {
        const poleJmenoPrijmeni= await jmenoAPrijmeni(page);
        const poleEmail = await emailPole(page);
        const poleHeslo = await hesloPole(page);
        const poleKontrolaHesla = await kontrolaHeslaPole(page);
        const zaregistrovatTlacitko = await tlacitkoZaregistrovat(page);

        const textovaChybaEmail = page.locator("span.invalid-feedback");
        const chybaSkakaci = page.locator(".toast.toast-error");
        
        await poleJmenoPrijmeni.fill("Ivan Jindrová");
        await poleEmail.fill("ivanjindrova@gmail.com");
        await poleHeslo.fill("Zima2024!");
        await poleKontrolaHesla.fill("Zima2024!");
        await zaregistrovatTlacitko.click();
    
        await textovaChybaEmail.isVisible();
        await chybaSkakaci.isVisible();
    
        await expect(textovaChybaEmail).toHaveText("Účet s tímto emailem již existuje");
        await expect(chybaSkakaci).toHaveText("×Špatně zadané poleNěkteré pole obsahuje špatně zadanou hodnotu");
    
    });
    
    test("Nevalidní registrace uživatele - heslo jen s čísly", async ({ page }) => {
        const poleJmenoPrijmeni= await jmenoAPrijmeni(page);
        const poleEmail = await emailPole(page);
        const poleHeslo = await hesloPole(page);
        const poleKontrolaHesla = await kontrolaHeslaPole(page);
        const zaregistrovatTlacitko = await tlacitkoZaregistrovat(page);
    
        const textovaChybaEmailCisla = page.getByText("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");
        const chybaSkakaci = page.locator(".toast.toast-error");
        
        await poleJmenoPrijmeni.fill("Iva Jindrová");
        await poleEmail.fill("ivajindrova@gmail.com");
        await poleHeslo.fill("123456");
        await poleKontrolaHesla.fill("123456");
        await zaregistrovatTlacitko.click();
    
        await textovaChybaEmailCisla.isVisible();
        await chybaSkakaci.isVisible();
    
        await expect(textovaChybaEmailCisla).toHaveText("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");
        await expect(chybaSkakaci).toHaveText("×Špatně zadaná poleVíce polí obsahuje špatně zadanou hodnotu");
    });

});