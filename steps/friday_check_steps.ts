const { expect } = require("@playwright/test");
const { Given, When, Then } = require("@cucumber/cucumber");

const isItFriday = (today: string): boolean => {
  return today === "Friday" ? true : false;
};

let today: string = "";
let actualAnswer: string = "";

Given("today is {string}", function (day: string) {
  today = day;
});

When("I ask whether it's Friday yet", function () {
  actualAnswer = isItFriday(today) == true ? "Yes" : "Nope";
});

Then("I should be told {string}", function (expectedAnswer: string) {
  expect(actualAnswer).toBe(expectedAnswer);
});
