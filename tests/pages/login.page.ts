import { expect, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get usernameInput() {
    return this.page.locator("#user-name");
  }

  get passwordInput() {
    return this.page.locator("#password");
  }

  get loginButton() {
    return this.page.locator("#login-button");
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  get inventoryTitle() {
    return this.page.locator('[data-test="title"]');
  }

  get inventoryList() {
    return this.page.locator('[data-test="inventory-list"]');
  }

  async goto() {
    await this.page.goto("");
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory.html/);
    await expect(this.inventoryTitle).toHaveText("Products");
    await expect(this.inventoryList).toBeVisible();
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }
}
