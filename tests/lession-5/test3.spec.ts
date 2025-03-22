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
      console.log(
        "🚀 ~ awaittest.step ~ deleteButtonLocators:",
        deleteButtonLocators
      );
      for (const deleteButton of deleteButtonLocators) {
        const buttonId = await deleteButton.getAttribute("id");
        if (!buttonId) {
          throw new Error("Button id not found");
        }
        const number = buttonId?.split("-")[1];
        if (parseInt(number) % 2 === 1) {
          page.once("dialog", (dialog) => dialog.accept());
          await deleteButton.click();
          //   Create a Promise that resolves when dialog is handled
          // const dialogPromise = new Promise<void>((resolve) => {
          //   page.once("dialog", async (dialog) => {
          //     await dialog.accept();
          //     resolve();
          //   });
          //   });
          //   await deleteButton.click();
          // Wait for dialog to be handled
          //   await dialogPromise;
        }
      }
    });
  });

  ////Stuck in handling async await when delete record
  //   const todoTaskLocators = await page
  //     .getByTestId("task-list")
  //     .locator("//span")
  //     .all();
  //   console.log("🚀 ~ awaittest.step ~ todoTaskLocators:", todoTaskLocators);

  //   for (const taskLocator of todoTaskLocators) {
  //     console.log("🚀 ~ awaittest.step ~ taskLocator:", taskLocator);

  //     const taskName = await taskLocator.innerText();
  //     const taskNumber = taskName?.split(" ")[1];
  //     console.log("🚀 ~ awaittest.step ~ taskNumber:", taskNumber);
  //     const number = parseInt(taskNumber);

  //     if (number % 2 === 1) {
  //       // once will remove listener after it called once (instead of using page.on then we need to call page.removeListener("dialog", handleDialog))
  //       page.once("dialog", (dialog) => dialog.accept());

  //       const deleteButton = page.locator(
  //         `//button[contains(@id,'todo-${number}-delete')]`
  //       );
  //       await deleteButton.click();
  //     }
  //   }
  // });
});
