const { expect } = require("@playwright/test");
const { Given, When, Then } = require("@cucumber/cucumber");

const isItFriday = (today) => {
  let answer = "Nope";
  if (today === "Friday") {
    answer = "Yes";
  }
  return answer;
};

Given("today is {string}", (day) => {
  this.today = day;
});

When("I ask whether it's Friday yet", () => {
  this.actualAnswer = isItFriday(this.today);
});

Then("I should be told {string}", (expectedAnswer) => {
  expect(this.actualAnswer).toBe(expectedAnswer);
});
