import { createBdd } from "playwright-bdd";
import { test } from "../fixtures/test";

const { Given, When, Then } = createBdd(test);

Given("I am on the login page", async ({ loginPage }) => {
  await loginPage.goto();
});

When("I login with valid credentials", async ({ loginPage, loginUsers }) => {
  await loginPage.login(loginUsers.valid.username, loginUsers.valid.password);
});

When("I login with invalid credentials", async ({ loginPage, loginUsers }) => {
  await loginPage.login(loginUsers.invalid.username, loginUsers.invalid.password);
});

Then("I should be logged in successfully", async ({ loginPage }) => {
  await loginPage.verifyLoginSuccess();
});

Then("I should see an error message", async ({ loginPage }) => {
  await loginPage.verifyLoginError();
});
