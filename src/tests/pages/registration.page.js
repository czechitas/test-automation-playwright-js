//Page object describing the registration page//

import { AppPage } from "./app.page";

export class RegistrationPage extends AppPage {
  constructor(page) {
    super(page, "registrace");
    this.fullNameInput = this.page.getByLabel("Jméno a příjmení");
    this.emailInput = this.page.getByLabel("Email");
    this.passwordInput = this.page.getByLabel("Heslo");
    this.confirmPasswordInput = this.page.getByLabel("Kontrola hesla");
    this.registrationButton = this.page.getByRole("button", {
      name: "Zaregistrovat",
    });
  }

  async register(userFullName, username, password) {
    await this.fullNameInput.fill(userFullName);
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.registrationButton.click();
  }
}
