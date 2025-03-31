import test, { expect } from "@playwright/test";
import { PersonalNotePage } from "../pages/personal-note-page";
import { ZingPage } from "../pages/zing-page";

interface Article {
  title: string;
  content: string;
}
let articles = [] as Article[];
const numberOfArticles = 10;
const numberOfSearchCharacters = 20;

test.describe("Exercise add note in Personal note page", () => {
  test("Personal note page", async ({ page }) => {
    const zingPage = new ZingPage(page);
    const personalNotePage = new PersonalNotePage(page);

    await test.step("Go to Zing news", async () => {
      await zingPage.openZingPage();
    });

    await test.step("Get articles from zing news", async () => {
      articles = await zingPage.getArticles(numberOfArticles);
    });

    await test.step("Go to Personal Note page", async () => {
      await personalNotePage.openPersonalNotePage();
    });

    await test.step("Add notes with title and content get from articles", async () => {
      await personalNotePage.addNotesWithArticles(articles);
    });

    await test.step("Verify counting notes", async () => {
      await expect(personalNotePage.noteCount).toHaveText(
        `Total Notes: ${numberOfArticles}`
      );
    });

    await test.step("Verify searching by title", async () => {
      const searchTerm = await personalNotePage.getSearchTerm(
        articles,
        "title",
        numberOfSearchCharacters
      );
      await personalNotePage.searchByKeyword(searchTerm);
      const firstResult = await personalNotePage.getFirstSearchResult();

      expect(firstResult).toContain(searchTerm);
    });

    await test.step("Verify searching by content", async () => {
      const searchTerm = await personalNotePage.getSearchTerm(
        articles,
        "content",
        numberOfSearchCharacters
      );
      await personalNotePage.searchByKeyword(searchTerm);
      const firstResult = await personalNotePage.getFirstSearchResult();

      expect(firstResult).toContain(searchTerm);
    });
  });
});
