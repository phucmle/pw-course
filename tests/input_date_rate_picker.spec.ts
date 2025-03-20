import test from "@playwright/test";
const URL = "https://material.playwrightvn.com/";

test("Interact with input type date or date range", async ({ page }) => {
  await test.step("Go to User Registration page", async () => {
    await page.goto(URL + "01-xpath-register-page.html");
  });

  await test.step("Input date", async () => {
    await page.locator("//input[@id='dob']").fill("2024-03-18");
  });

  await test.step("Input rating", async () => {
    await page.locator("//input[@id='rating']").fill("9");
  });

  await test.step("Input fav color", async () => {
    await page.locator("//input[@id='favcolor']").fill("#111111");
  });
});
