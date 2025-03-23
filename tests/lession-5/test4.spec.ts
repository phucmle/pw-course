import test, { expect } from "@playwright/test";

const ZING_URL = "https://znews.vn/";

interface Article {
  title: string;
  content: string;
}
let articles = [] as Article[];
const numberOfArticles = 10;

test.describe("Exercise add note in Personal note page", () => {
  test("Personal note page", async ({ page }) => {
    const personalNoteHref = page.locator(
      "//a[contains(text(),'Personal notes')]"
    );
    const titleInput = page.locator("//*[@id='note-title']");
    const contentInput = page.locator("//*[@id='note-content']");
    const addButton = page.locator("//*[@id='add-note']");
    const noteCount = page.locator("//*[@id='note-count']");

    async function getArticles(numberOfNotes: number) {
      //Get all articles
      const newArticles = await page
        .locator("//article[contains(@class,article-item)]")
        .all();

      for (const newArticle of newArticles) {
        const zingTitleNews: string = await newArticle
          .locator("//p[@class='article-title']")
          .innerText();
        const zingDesNews: string = await newArticle
          .locator("//p[@class='article-summary']")
          .innerText();

        const hasTitleAndContent: boolean =
          Boolean(zingTitleNews?.trim()) && Boolean(zingDesNews?.trim());

        // Check if the article has both title and content
        if (hasTitleAndContent) {
          articles.push({ title: zingTitleNews, content: zingDesNews });
          const hasExpectedNumberOfNotes: boolean =
            articles.length === numberOfNotes;
          //Exit for loop when it reaches the expected number
          if (hasExpectedNumberOfNotes) {
            break;
          }
        }
      }
    }

    await test.step("Go to Zing news", async () => {
      await page.goto(ZING_URL);
      await page.waitForLoadState("networkidle");
    });

    await test.step("Get articles from zing news", async () => {
      await getArticles(numberOfArticles);
    });

    await test.step("Go to Personal Note page", async () => {
      await page.goto("/");
      await personalNoteHref.click();
    });

    await test.step("Add notes with title and content get from articles", async () => {
      for (const article of articles) {
        await titleInput.fill(article.title);
        await contentInput.fill(article.content);
        await addButton.click();
      }
    });

    await test.step("Verify counting notes", async () => {
      await expect(noteCount).toHaveText(`Total Notes: ${numberOfArticles}`);
    });

    await test.step("Verify searching by title", async () => {
      //In-progress
    });

    await test.step("Verify searching by content", async () => {
      //In-progress
    });
  });
});
