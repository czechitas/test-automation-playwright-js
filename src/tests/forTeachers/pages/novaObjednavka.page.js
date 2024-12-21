export class StrankaNoveObjednavky {
    constructor(page) {
        this.page = page;
        this.heading = this.page.getByRole("heading", { level: 3 });
        this.proUcitele = this.page.getByRole('button', { name: 'Pro učitelé' });
        this.objednavkaMSZS = this.page.getByRole('link', { name: 'Objednávka pro MŠ/ZŠ' })
    }


}