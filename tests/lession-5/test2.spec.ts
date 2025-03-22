import test, { expect } from "@playwright/test";

const URL = "https://material.playwrightvn.com/";
const PRODUCTS = [
  { PRODUCT_NAME: "Product 1", PRODUCT_PRICE: 10, PRODUCT_QUANTITY: 5 },
  { PRODUCT_NAME: "Product 2", PRODUCT_PRICE: 20, PRODUCT_QUANTITY: 3 },
  { PRODUCT_NAME: "Product 3", PRODUCT_PRICE: 30, PRODUCT_QUANTITY: 1 },
];

test.describe("Exercise add product in Product page", () => {
  test("Product page", async ({ page }) => {
    await test.step("Go to product page", async () => {
      await page.goto(URL);
      await page.locator("//a[contains(text(),'Product page')]").click();
    });

    await test.step("Add product", async () => {
      for (const product of PRODUCTS) {
        try {
          const addButton = page.locator(
            `//div[text()='${product.PRODUCT_NAME}']/following-sibling::button`
          );
          await addButton.waitFor({ state: "visible" });
          await addButton.click({
            clickCount: product.PRODUCT_QUANTITY,
            delay: 100,
          });
        } catch (error) {
          console.error(`Failed to add product for ${product.PRODUCT_NAME}`);
          throw error;
        }
      }
    });

    await test.step("Verify the result table", () => {
      let grandTotal: number = 0;

      PRODUCTS.forEach((product) => {
        const subTotal = product.PRODUCT_QUANTITY * product.PRODUCT_PRICE;
        grandTotal += subTotal;

        const quantityCell = page.locator(
          `//td[text()='${product.PRODUCT_NAME}']/following-sibling::td[2]`
        );
        const productNameCell = page.locator(
          `//td[text()='${product.PRODUCT_NAME}']/following-sibling::td[3]`
        );

        expect(quantityCell).toHaveText(product.PRODUCT_QUANTITY.toString());
        expect(productNameCell).toContainText(subTotal.toString());
      });

      expect(page.locator('//td[@class="total-price"]')).toContainText(
        grandTotal.toString()
      );
    });
  });
});
