export class AppPage {
  constructor(page, url) {
    this.url = url;
    this.page = page;
    this.toast = this.page.locator(".toast-message");
    this.navbarRight = this.page.locator(".navbar-right");
    this.usernameDropdown = this.navbarRight.locator(
      "[data-toggle='dropdown']"
    );
    this.logoutLink = this.page.locator("#logout-link");
    this.fieldError = this.page.locator(".invalid-feedback");
  }

  async open() {
    await this.page.goto("/" + this.url);
  }

  async getToastMessage() {
    return await this.toast.textContent();
  }

  async logout() {
    await this.usernameDropdown.click();
    await this.logoutLink.click();
  }

  async getCurrentUser() {
    return await this.usernameDropdown.textContent();
  }
}
