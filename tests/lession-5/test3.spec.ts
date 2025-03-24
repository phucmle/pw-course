import test, { expect, selectors } from "@playwright/test";

const URL = "https://material.playwrightvn.com/";
const numberOfTasks = 10;

test.describe("Exercise add todo list in Todo page", () => {
  test("Todo page", async ({ page }) => {
    await test.step("Go to todo page", async () => {
      await page.goto(URL);
      await page.locator("//a[contains(text(),'Todo page')]").click();
    });

    await test.step("Add 100 task with prefix Todo <i>", async () => {
      selectors.setTestIdAttribute("id");
      for (let i = 1; i <= numberOfTasks; i++) {
        const taskName = `Todo ${i}`;
        await page.getByTestId("new-task").fill(taskName);
        await page.getByTestId("add-task").click();
      }
    });

    await test.step("Delete the odd-numbered todos", async () => {
      const deleteButtonLocators = await page
        .locator("//button[contains(@id,'delete')]")
        .all();

      // Common issue when trying to delete elements in a loop while using a pre-collected list of locators.
      // The problem occurs because the DOM structure changes after each deletion, making the original locators invalid
      // for (const deleteButton of deleteButtonLocators) {
      //   const buttonId = await deleteButton.getAttribute("id");
      //   console.log("🚀 ~ awaittest.step ~ buttonId:", buttonId);
      //   if (!buttonId) {
      //     throw new Error("Button id not found");
      //   }
      //   const number = buttonId?.split("-")[1];
      //   if (parseInt(number) % 2 === 1) {
      //     page.once("dialog", (dialog) => dialog.accept());
      //     await deleteButton.click();
      //   }
      // }

      // Solution: Loop through the array in reverse order
      for (let i = deleteButtonLocators.length - 1; i >= 0; i--) {
        const deleteButton = deleteButtonLocators[i];
        const buttonId = await deleteButton.getAttribute("id");
        if (!buttonId) {
          throw new Error("Button id not found");
        }
        const number = buttonId.split("-")[1];
        if (parseInt(number) % 2 === 1) {
          page.once("dialog", (dialog) => dialog.accept());
          await deleteButton.click();
        }
      }
    });
  });
});
