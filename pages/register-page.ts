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

  xUserNameInput = "//input[@id='username']";
  xEmailInput = "//input[@id='email']";
  xGenderInput = (gender: string = "male" || "female") => {
    return `//input[@id='${gender}']`;
  };
  xHobbies = (hobbie: string) => {
    return `//input[@id='${hobbie}']`;
  };
  xInterests = "//select[@id='interests']";
  xCountry = "//select[@id='country']";
  xDOB = "//input[@id='dob']";
  xProfile = "//input[@id='profile']";
  xBio = "//textarea[@id='bio']";
  xRating = "//input[@id='rating']";
  xFavourite = "//input[@id='favcolor']";
  xNewsLetter = "//input[@id='newsletter']";
  xToggleOption = "//span[@class='slider round']";
  xSubmitBtn = "//button[@type='submit']";

  xUserNameResult = "//table[@id='userTable']//td[2]";
  xEmailResult = "//table[@id='userTable']//td[3]";
  xInformationResult = "//table[@id='userTable']//td[4]";

  userNameInput = () => {
    return this.page.locator(this.xUserNameInput);
  };
  emailInput = () => {
    return this.page.locator(this.xEmailInput);
  };
  genderInput = (gender: string) => {
    return this.page.locator(this.xGenderInput(gender));
  };
  hobbiesInput = (hobbie: string) => {
    return this.page.locator(this.xHobbies(hobbie));
  };
  interestsInput = () => {
    return this.page.locator(this.xInterests);
  };
  countryInput = () => {
    return this.page.locator(this.xCountry);
  };
  dobInput = () => {
    return this.page.locator(this.xDOB);
  };
  profileInput = () => {
    return this.page.locator(this.xProfile);
  };
  bioInput = () => {
    return this.page.locator(this.xBio);
  };
  ratingInput = () => {
    return this.page.locator(this.xRating);
  };
  favouriteInput = () => {
    return this.page.locator(this.xFavourite);
  };
  newsLetterInput = () => {
    return this.page.locator(this.xNewsLetter);
  };
  toggleOptionInput = () => {
    return this.page.locator(this.xToggleOption);
  };
  submitBtn = () => {
    return this.page.locator(this.xSubmitBtn);
  };

  emailResult = () => {
    return this.page.locator(this.xEmailResult);
  };
  userNameResult = () => {
    return this.page.locator(this.xUserNameResult);
  };
  informationResult = () => {
    return this.page.locator(this.xInformationResult);
  };

  openRegisterPage = async () => {
    await this.openMainPage();
    await this.page.locator("//a[contains(text(),'Register Page')]").click();
  };

  fillRegisterForm = async (userInformations: IUserInformation) => {
    selectors.setTestIdAttribute("id");
    //Username
    await this.userNameInput().fill(userInformations.userName);
    //Email
    await this.emailInput().fill(userInformations.email);
    //Gender
    await this.genderInput(userInformations.gender).setChecked(true);
    //Hobbies
    for (const hobbie of userInformations.hobbies) {
      await this.hobbiesInput(hobbie).setChecked(true);
    }
    //Interests
    await this.interestsInput().selectOption([
      { label: "Technology" },
      { label: "Music" },
    ]);
    //Country
    await this.countryInput().selectOption("Canada");
    //DOB
    await this.dobInput().fill("2024-03-18");
    //Profile picture
    await this.profileInput().setInputFiles("playwright.config.ts");
    //Biography
    await this.bioInput().fill("bio 22222");
    //Rate us
    await this.ratingInput().fill("1");
    //Favorite color
    await this.favouriteInput().fill("#111111");
    //Newsletter
    await this.newsLetterInput().check();
    //Enable feauture
    await this.toggleOptionInput().setChecked(true);
    //Register
    await this.submitBtn().click();
  };
}
