import test, { expect, selectors } from "@playwright/test";
const USER_INFORMATIONS = {
  USER_NAME: "felix",
  EMAIL: "felix_test@gmail.com",
  GENDER: "male",
  HOBBIES: ["reading", "cooking"],
};

const hobbiesText = USER_INFORMATIONS.HOBBIES.join(", ");

test.describe("Exercise input in Register page", () => {
  test("User Register", async ({ page }) => {
    await test.step("Go to register page", async () => {
      await page.goto("https://material.playwrightvn.com/");
      await page.locator("//a[contains(text(),'Register Page')]").click();
    });

    await test.step("Input data in the form", async () => {
      selectors.setTestIdAttribute("id");
      //Username
      await page.getByTestId("username").fill(USER_INFORMATIONS.USER_NAME);
      //Email
      await page.getByTestId("email").fill(USER_INFORMATIONS.EMAIL);
      //Gender
      await page.getByTestId(USER_INFORMATIONS.GENDER).setChecked(true);
      //Hobbies
      for (const hobbie of USER_INFORMATIONS.HOBBIES) {
        await page.getByTestId(hobbie).setChecked(true);
      }
      // forEach couldn't handle async await
      //   USER_INFORMATIONS.HOBBIES.forEach(
      //     async (hobbie) => await page.getByTestId(hobbie).setChecked(true)
      //   );
      //   await page.getByTestId("reading").setChecked(true);
      //   await page.getByTestId("cooking").setChecked(true);
      //Interests
      await page
        .getByTestId("interests")
        .selectOption([{ label: "Technology" }, { label: "Music" }]);
      //Country
      await page.getByTestId("country").selectOption("Canada");
      //DOB
      await page.getByTestId("dob").fill("2024-03-18");
      //Profile picture
      await page.getByTestId("profile").setInputFiles("playwright.config.ts");
      //Biography
      await page.getByTestId("bio").fill("bio 1111");
      await page.getByTestId("bio").fill("bio 2222");
      //Rate us
      await page.getByTestId("rating").fill("1");
      //Favorite color
      await page.getByTestId("favcolor").fill("#111111");
      //Newsletter
      await page.getByTestId("newsletter").check();
      //Enable feauture
      await page.locator('//span[@class="slider round"]').check();
      //Register
      await page.locator("//button[@type='submit']").click();
    });

    expect(page.locator("//table[@id='userTable']//td[2]")).toHaveText(
      USER_INFORMATIONS.USER_NAME
    );
    expect(page.locator("//table[@id='userTable']//td[3]")).toHaveText(
      USER_INFORMATIONS.EMAIL
    );
    expect(page.locator("//table[@id='userTable']//td[4]")).toContainText(
      `Gender: ${USER_INFORMATIONS.GENDER}`
    );
    expect(page.locator("//table[@id='userTable']//td[4]")).toContainText(
      `Hobbies: ${hobbiesText}`
    );
  });
});
