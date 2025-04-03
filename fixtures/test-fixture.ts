import { RegisterPage } from "../pages/register-page";
import { ProductPage } from "../pages/product-page";
import { ToDoPage } from "../pages/todo-page";
import { PersonalNotePage } from "../pages/personal-note-page";
import { ZingPage } from "../pages/zing-page";
import { test as base } from "@playwright/test";

// Declare the types of your fixtures.
type MyFixtures = {
  registerPage: RegisterPage;
  productPage: ProductPage;
  toDoPage: ToDoPage;
  personalNotePage: PersonalNotePage;
  zingPage: ZingPage;
};

// Extend base test by providing "registerPage" and "productPage"...
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  registerPage: async ({ page }, use) => {
    // Set up the fixture.
    const registerPage = new RegisterPage(page);
    // Use the fixture value in the test.
    await use(registerPage);
    // Clean up the fixture.
    // do something
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  toDoPage: async ({ page }, use) => {
    await use(new ToDoPage(page));
  },
  personalNotePage: async ({ page }, use) => {
    await use(new PersonalNotePage(page));
  },
  zingPage: async ({ page }, use) => {
    await use(new ZingPage(page));
  },
});

export { expect } from "@playwright/test";
