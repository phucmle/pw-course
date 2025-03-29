import { Page } from "playwright";

export class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  navigateTo = async (url: string) => {
    await this.page.goto(url);
  };

  openMainPage = async () => {
    await this.page.goto("/");
  };
}
