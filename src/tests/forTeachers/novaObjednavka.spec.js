import { expect, test } from "@playwright/test";
import { StrankaNoveObjednavky } from "./pages/novaObjednavka.page";

test.describe("Pro učitele - nova objednavka", async () => {

    test("Hello world", async ({ page }) => {
        const strankaNoveObjednavky = new StrankaNoveObjednavky(page);
        await page.goto("/objednavka/pridat");

        await expect(strankaNoveObjednavky.heading).toBeVisible();
    })

    test("Lze prokliknout na stránku s objednávkou", async ({ page }) => {
        await page.goto("https://team8-2022brno.herokuapp.com");

        const proklikProUcitele = new StrankaNoveObjednavky(page);
        await expect(proklikProUcitele.proUcitele).toBeVisible();
        await proklikProUcitele.proUcitele.click();

        const proklikObjednavkaMSZS = new StrankaNoveObjednavky(page);
        await proklikObjednavkaMSZS.objednavkaMSZS.click();

        await page.getByRole('button', { name: 'Pro učitelé' }).click();
        await page.locator('.dropdown-item').filter({ hasText: 'Objednávka pro MŠ/ZŠ' }).click()
    })

    //nápad - beforeeach na to, že je vidět že NEJSEM přihlášen - v pravo je Přihlášen
})