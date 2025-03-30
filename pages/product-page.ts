import { Page } from "playwright";
import { BasePage } from "./base-page";

interface IProduct {
  name: string;
  price: number;
  quantity: number;
}

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  xAddBtn = (name: string) => {
    return `//div[text()='${name}']/following-sibling::button`;
  };

  xCartQuantity = (name: string) => {
    return `//td[text()='${name}']/following-sibling::td[2]`;
  };

  xProductName = (name: string) => {
    return `//td[text()='${name}']/following-sibling::td[3]`;
  };

  xTotalPrice = '//td[@class="total-price"]';

  addBtn = (name: string) => {
    return this.page.locator(this.xAddBtn(name));
  };

  cartQuantity = (name: string) => {
    return this.page.locator(this.xCartQuantity(name));
  };

  cartProductName = (name: string) => {
    return this.page.locator(this.xProductName(name));
  };

  totalPrice = () => {
    return this.page.locator(this.xTotalPrice);
  };

  openProductPage = async () => {
    await this.openMainPage();
    await this.page.locator("//a[contains(text(),'Product page')]").click();
  };

  addProduct = async (product: IProduct) => {
    const addButton = this.addBtn(product.name);
    await addButton.waitFor({ state: "visible" });
    await addButton.click({
      clickCount: product.quantity,
      delay: 100,
    });
  };

  addProducts = async (products: IProduct[]) => {
    for (const product of products) {
      try {
        await this.addProduct(product);
      } catch (error) {
        console.error(`Failed to add product for ${product.name}`);
        throw error;
      }
    }
  };
}
