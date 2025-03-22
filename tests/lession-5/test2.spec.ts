import test, { expect } from "@playwright/test";
const PRODUCTS = [
  { PRODUCT_NAME: "Product 1", PRODUCT_PRICE: 10, PRODUCT_QUANTITY: 5 },
  { PRODUCT_NAME: "Product 2", PRODUCT_PRICE: 20, PRODUCT_QUANTITY: 3 },
  { PRODUCT_NAME: "Product 3", PRODUCT_PRICE: 30, PRODUCT_QUANTITY: 1 },
];

test.describe("Exercise add product in Product page", () => {
  test("Product page", async ({ page }) => {
    await test.step("Go to product page", async () => {
      await page.goto("https://material.playwrightvn.com/");
      await page.locator("//a[contains(text(),'Product page')]").click();
      await page.waitForResponse(
        "https://material.playwrightvn.com/product-03.jpg"
      );
    });

    await test.step("Add product", async () => {
      for (const PRODUCT of PRODUCTS) {
        await page
          .locator(
            `//div[text()='${PRODUCT.PRODUCT_NAME}']/following-sibling::button`
          )
          .click({ clickCount: PRODUCT.PRODUCT_QUANTITY, delay: 100 });
      }
    });

    let total: number;
    let grandTotal: number = 0;

    PRODUCTS.forEach((PRODUCT) => {
      total = PRODUCT.PRODUCT_QUANTITY * PRODUCT.PRODUCT_PRICE;

      expect(
        page.locator(
          `//td[text()='${PRODUCT.PRODUCT_NAME}']/following-sibling::td[2]`
        )
      ).toHaveText(PRODUCT.PRODUCT_QUANTITY.toString());

      expect(
        page.locator(
          `//td[text()='${PRODUCT.PRODUCT_NAME}']/following-sibling::td[3]`
        )
      ).toContainText(total.toString());

      grandTotal += total;
    });

    expect(page.locator('//td[@class="total-price"]')).toContainText(
      grandTotal.toString()
    );
  });
});
