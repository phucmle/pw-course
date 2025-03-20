import test from "@playwright/test";
const URL = "https://material.playwrightvn.com/";

test("Interact with input type file date", async ({ page }) => {
  await test.step("Go to User Registration page", async () => {
    await page.goto(URL + "01-xpath-register-page.html");
  });

  await test.step("import file", async () => {
    await page
      .locator("//input[@id='profile']")
      .setInputFiles("tests-examples/demo-todo-app.spec.ts");
  });

  await test.step("hover on Newsletter", async () => {
    await page.locator("//div[@class='tooltip']").hover();
  });
});
