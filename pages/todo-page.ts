import { Locator, Page } from "playwright";
import { BasePage } from "./base-page";

export class ToDoPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  xTaskInput = '//input[@id="new-task"]';
  xAddTaskBtn = '//button[@id="add-task"]';
  xDeleteBtns = '//button[contains(@id,"delete")]';

  taskInput = () => {
    return this.page.locator(this.xTaskInput);
  };

  addTaskBtn = () => {
    return this.page.locator(this.xAddTaskBtn);
  };

  deleteButtons = () => {
    return this.page.locator(this.xDeleteBtns);
  };

  getBtnId = (btn: Locator) => {
    return btn.getAttribute("id");
  };

  openToDoPage = async () => {
    await this.openMainPage();
    await this.page.locator("//a[contains(text(),'Todo page')]").click();
  };

  addTasks = async (numberOfTasks: number, taskPrefix: string = "Todo ") => {
    for (let i = 1; i <= numberOfTasks; i++) {
      const taskName = taskPrefix + i;
      await this.taskInput().fill(taskName);
      await this.addTaskBtn().click();
    }
  };

  deleteOddTasks = async () => {
    const deleteButtons = await this.deleteButtons().all();

    // Common issue when trying to delete elements in a loop while using a pre-collected list of locators.
    // The problem occurs because the DOM structure changes after each deletion, making the original locators invalid
    // for (const deleteButton of deleteButtons) {
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
    for (let i = deleteButtons.length - 1; i >= 0; i--) {
      const deleteButton = deleteButtons[i];
      const buttonId = await this.getBtnId(deleteButton);
      if (!buttonId) {
        throw new Error("Button id not found");
      }

      const idNumber = buttonId.split("-")[1];
      const isOdd: boolean = parseInt(idNumber) % 2 !== 0;

      if (isOdd) {
        this.page.once("dialog", (dialog) => dialog.accept());
        await deleteButton.click();
      }
    }
  };
}
