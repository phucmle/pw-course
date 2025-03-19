import { test, expect, selectors } from "@playwright/test";
const URL = "https://material.playwrightvn.com/";

test.describe("First Test", async () => {
  test("has title", async ({ page }) => {
    test.step("Go to main page", async () => {
      await page.goto(URL);
    });

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(
      "Tài liệu học automation test - Playwright Việt Nam"
    );
    expect(await page.title()).toContain("Tài liệu học automation test");
  });

  test("get started link", async ({ page }) => {
    test.step("Go to main page", async () => {
      await page.goto(URL);
    });
    // Click the get started link.
    await page.getByRole("link", { name: "Bài học 1: Register Page" }).click();
    // Expects page to have a heading with the name of Installation.
    await expect(
      page.getByRole("heading", { name: "User Registration" })
    ).toBeVisible();
  });
});

test.describe("Second Test", () => {
  test("clickable", async ({ page }) => {
    let counter: number = 0;

    // First step
    await test.step("Go to main page", async () => {
      await page.goto(URL);
    });

    // Second step
    await test.step("Go open mouse event page", async () => {
      await page.getByText("Bài học 5: Xử lý mouse event").click();
    });

    // Third step
    await test.step("Single click on button", async () => {
      selectors.setTestIdAttribute("id");
      await page.getByTestId("clickArea").click();
      counter += 1;

      expect(page.locator("//p[@id='clickCount']")).toHaveText(
        `Số lần nhấn: ${counter}`
      );
      expect(page.getByTestId("clickType")).toHaveText("Loại nhấn: Đơn");
    });

    // Fourth step
    await test.step("Double click on button", async () => {
      await page.locator("//div[@id='clickArea']").dblclick();
      counter += 2;

      expect(page.getByTestId("clickCount")).toHaveText(
        `Số lần nhấn: ${counter}`
      );
      expect(page.getByTestId("clickType")).toHaveText("Loại nhấn: Đúp");
    });
  });
});

test.describe("input in basic form", () => {
  selectors.setTestIdAttribute("id");

  test("User Registration form", async ({ page }) => {
    await test.step("Go to User Registration form", async () => {
      await page.goto(URL + "01-xpath-register-page.html");
    });

    await test.step("Input username", async () => {
      selectors.setTestIdAttribute("id");
      await page.getByTestId("username").fill("Felix");
      await page
        .locator("//input[@id='username']")
        .pressSequentially("test new username", { delay: 10 });
    });

    await test.step("Check female", async () => {
      await page.getByTestId("female").check();
    });

    await test.step("Check male", async () => {
      await page.getByTestId("male").setChecked(true);
    });

    await test.step("Check traveling and cooking", async () => {
      await page.getByTestId("traveling").setChecked(true);
      await page.getByTestId("cooking").setChecked(true);
      await page.getByTestId("reading").setChecked(true);
      await page.getByTestId("reading").setChecked(false);
      await page.getByTestId("reading").check();
      await page.getByTestId("reading").uncheck();
    });

    await test.step("Select country", async () => {
      await page.getByTestId("country").selectOption({ label: "Canada" });
    });

    await test.step("Select interests", async () => {
      await page.getByTestId("interests").selectOption(["Art", "Music"]);
    });
    await test.step("input date", async () => {
      await page.getByTestId("dob").fill("1996-03-18");
    });
  });
});
