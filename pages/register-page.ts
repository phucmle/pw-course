import { Page, selectors } from "playwright";
import { BasePage } from "./base-page";

interface IUserInformation {
  userName: string;
  email: string;
  gender: string;
  hobbies: string[];
}

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  xUserName = "//table[@id='userTable']//td[2]";
  xEmail = "//table[@id='userTable']//td[3]";
  xInformation = "//table[@id='userTable']//td[4]";

  emailResult = () => {
    return this.page.locator(this.xEmail);
  };
  userNameResult = () => {
    return this.page.locator(this.xUserName);
  };
  informationResult = () => {
    return this.page.locator(this.xInformation);
  };

  openRegisterPage = async () => {
    await this.openMainPage();
    await this.page.locator("//a[contains(text(),'Register Page')]").click();
  };

  fillRegisterForm = async (userInformations: IUserInformation) => {
    selectors.setTestIdAttribute("id");
    //Username
    await this.page.getByTestId("username").fill(userInformations.userName);
    //Email
    await this.page.getByTestId("email").fill(userInformations.email);
    //Gender
    await this.page.getByTestId(userInformations.gender).setChecked(true);
    //Hobbies
    for (const hobbie of userInformations.hobbies) {
      await this.page.getByTestId(hobbie).setChecked(true);
    }
    //Interests
    await this.page
      .getByTestId("interests")
      .selectOption([{ label: "Technology" }, { label: "Music" }]);
    //Country
    await this.page.getByTestId("country").selectOption("Canada");
    //DOB
    await this.page.getByTestId("dob").fill("2024-03-18");
    //Profile picture
    await this.page
      .getByTestId("profile")
      .setInputFiles("playwright.config.ts");
    //Biography
    await this.page.getByTestId("bio").fill("bio 1111");
    await this.page.getByTestId("bio").fill("bio 2222");
    //Rate us
    await this.page.getByTestId("rating").fill("1");
    //Favorite color
    await this.page.getByTestId("favcolor").fill("#111111");
    //Newsletter
    await this.page.getByTestId("newsletter").check();
    //Enable feauture
    await this.page.locator('//span[@class="slider round"]').check();
    //Register
    await this.page.locator("//button[@type='submit']").click();
  };
}
