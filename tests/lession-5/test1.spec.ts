import test, { expect, selectors } from "@playwright/test";
import { RegisterPage } from "../../pages/register-page";
const testUserInformations = {
  userName: "felix",
  email: "felix_test@gmail.com",
  gender: "male",
  hobbies: ["reading", "cooking"],
};

const hobbiesText = testUserInformations.hobbies.join(", ");

test.describe("Exercise input in Register page", () => {
  test("User Register", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await test.step("Go to register page", async () => {
      await registerPage.openRegisterPage();
    });

    await test.step("Input data in the form", async () => {
      await registerPage.fillRegisterForm(testUserInformations);
    });

    await test.step("Verify results table", () => {
      expect(registerPage.userNameResult()).toHaveText(
        testUserInformations.userName
      );
      expect(registerPage.emailResult()).toHaveText(testUserInformations.email);
      expect(registerPage.informationResult()).toContainText(
        `Gender: ${testUserInformations.gender}`
      );
      expect(registerPage.informationResult()).toContainText(
        `Hobbies: ${hobbiesText}`
      );
    });
  });
});
