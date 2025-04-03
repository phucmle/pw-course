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

  goToPage = async (pageName: string) => {
    await this.page.locator(`//a[contains(text(),'${pageName}')]`).click();
    await this.page.waitForLoadState("networkidle");
  };
}
