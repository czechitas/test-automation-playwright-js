import { expect, test } from "@playwright/test";

test("Zobrazení formuláře registrace", async ({ page }) => {
    await page.goto("/registrace");

    const jmenoAPrijmeni = page.getByLabel("Jméno a příjmení");
    const emailPole = page.getByLabel("Email");
    const hesloPole = page.getByLabel("Heslo");
    const kontrolaHeslaPole = page.getByLabel("Kontrola hesla");
    const tlacitkoZaregistrovat = page.getByRole("button", { name: "Zaregistrovat" });

    await expect(jmenoAPrijmeni).toBeVisible();
    await expect(emailPole).toBeVisible();
    await expect(hesloPole).toBeVisible();
    await expect(kontrolaHeslaPole).toBeVisible();

    await expect(tlacitkoZaregistrovat).toBeVisible();
    await expect(tlacitkoZaregistrovat).toHaveText("Zaregistrovat");
})

test("Validní registrace uživatele", async ({ page }) => {
    await page.goto("/registrace");

    // Proměnné k jednotlivým objektům
    const jmenoAPrijmeni = page.getByLabel("Jméno a příjmení");
    const emailPole = page.getByLabel("Email");
    const hesloPole = page.getByLabel("Heslo");
    const kontrolaHeslaPole = page.getByLabel("Kontrola hesla");
    const tlacitkoZaregistrovat = page.getByRole("button", { name: "Zaregistrovat" });
    const prihlasen = page.getByRole("button", { name: "Iv Jindrová" })
    const prihlasen1 = page.locator('strong:has-text("Iv Jindrová")');

    await jmenoAPrijmeni.fill("Iv Jindrová");
    await emailPole.fill("yjindrova@gmail.com");
    await hesloPole.fill("Zima2024!");
    await kontrolaHeslaPole.fill("Zima2024!");
    await tlacitkoZaregistrovat.click();

    await expect(prihlasen).toHaveText("Iv Jindrová")

})

test("Nevalidní registrace uživatele - stejný email", async ({ page }) => {
    await page.goto("/registrace");

    const jmenoAPrijmeni = page.getByLabel("Jméno a příjmení");
    const emailPole = page.getByLabel("Email");
    const hesloPole = page.getByLabel("Heslo");
    const kontrolaHeslaPole = page.getByLabel("Kontrola hesla");
    const tlacitkoZaregistrovat = page.getByRole("button", { name: "Zaregistrovat" });

    const textovaChybaEmail = page.locator("span.invalid-feedback");
    const chybaSkakaci = page.locator(".toast.toast-error");
    
    await jmenoAPrijmeni.fill("Ivan Jindrová");
    await emailPole.fill("ivanjindrova@gmail.com");
    await hesloPole.fill("Zima2024!");
    await kontrolaHeslaPole.fill("Zima2024!");
    await tlacitkoZaregistrovat.click();

    await textovaChybaEmail.isVisible();
    await chybaSkakaci.isVisible();

    await expect(textovaChybaEmail).toHaveText("Účet s tímto emailem již existuje");
    await expect(chybaSkakaci).toHaveText("×Špatně zadané poleNěkteré pole obsahuje špatně zadanou hodnotu")

})

test("Nevalidní registrace uživatele - heslo jen s čísly", async ({ page }) => {
    await page.goto("/registrace");

    const jmenoAPrijmeni = page.getByLabel("Jméno a příjmení");
    const emailPole = page.getByLabel("Email");
    const hesloPole = page.getByLabel("Heslo");
    const kontrolaHeslaPole = page.getByLabel("Kontrola hesla");
    const tlacitkoZaregistrovat = page.getByRole("button", { name: "Zaregistrovat" });

    const textovaChybaEmailCisla = page.getByText('Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici')
    const chybaSkakaci = page.locator(".toast.toast-error");
    
    await jmenoAPrijmeni.fill("Iva Jindrová");
    await emailPole.fill("ivajindrova@gmail.com");
    await hesloPole.fill("123456");
    await kontrolaHeslaPole.fill("123456");
    await tlacitkoZaregistrovat.click();

    await textovaChybaEmailCisla.isVisible();
    await chybaSkakaci.isVisible();

    await expect(textovaChybaEmailCisla).toHaveText("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");
    await expect(chybaSkakaci).toHaveText("×Špatně zadaná poleVíce polí obsahuje špatně zadanou hodnotu")

})