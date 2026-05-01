import { test as base } from "playwright-bdd";
import { loginUsers } from "../data/login.data";
import { LoginPage } from "../pages/login.page";

type Fixtures = {
  loginPage: LoginPage;
  loginUsers: typeof loginUsers;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  loginUsers: async ({}, use) => {
    await use(loginUsers);
  },
});
