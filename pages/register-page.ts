import { Page } from "playwright";
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

  //xpaths
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

  //locators
  userNameInput = this.page.locator(this.xUserNameInput);
  emailInput = this.page.locator(this.xEmailInput);
  genderInput = (gender: string) => {
    return this.page.locator(this.xGenderInput(gender));
  };
  hobbiesInput = (hobbie: string) => {
    return this.page.locator(this.xHobbies(hobbie));
  };
  interestsInput = this.page.locator(this.xInterests);
  countryInput = this.page.locator(this.xCountry);
  dobInput = this.page.locator(this.xDOB);
  profileInput = this.page.locator(this.xProfile);
  bioInput = this.page.locator(this.xBio);
  ratingInput = this.page.locator(this.xRating);
  favouriteInput = this.page.locator(this.xFavourite);
  newsLetterInput = this.page.locator(this.xNewsLetter);
  toggleOptionInput = this.page.locator(this.xToggleOption);
  submitBtn = this.page.locator(this.xSubmitBtn);
  emailResult = this.page.locator(this.xEmailResult);
  userNameResult = this.page.locator(this.xUserNameResult);
  informationResult = this.page.locator(this.xInformationResult);

  //functions
  openRegisterPage = async () => {
    await this.openMainPage();
    await this.goToPage("Register Page");
  };

  fillRegisterForm = async (userInformations: IUserInformation) => {
    //Username
    await this.userNameInput.fill(userInformations.userName);
    //Email
    await this.emailInput.fill(userInformations.email);
    //Gender
    await this.genderInput(userInformations.gender).setChecked(true);
    //Hobbies
    for (const hobbie of userInformations.hobbies) {
      await this.hobbiesInput(hobbie).setChecked(true);
    }
    //Interests
    await this.interestsInput.selectOption([
      { label: "Technology" },
      { label: "Music" },
    ]);
    //Country
    await this.countryInput.selectOption("Canada");
    //DOB
    await this.dobInput.fill("2024-03-18");
    //Profile picture
    await this.profileInput.setInputFiles("playwright.config.ts");
    //Biography
    await this.bioInput.fill("bio 22222");
    //Rate us
    await this.ratingInput.fill("1");
    //Favorite color
    await this.favouriteInput.fill("#111111");
    //Newsletter
    await this.newsLetterInput.check();
    //Enable feauture
    await this.toggleOptionInput.setChecked(true);
    //Register
    await this.submitBtn.click();
  };
}
