import { test, expect } from "../../fixtures/test-fixture";

const numberOfTasks = 100;
const taskPrefix = "Felix ";

test.describe("Exercise add todo list in Todo page", () => {
  test("Todo page", async ({ toDoPage }) => {
    await test.step("Go to todo page", async () => {
      await toDoPage.openToDoPage();
    });

    await test.step("Add 100 task with prefix Felix <i>", async () => {
      await toDoPage.addTasks(numberOfTasks, taskPrefix);
    });

    await test.step("Delete the odd-numbered todos", async () => {
      await toDoPage.deleteOddTasks();
    });
  });
});
